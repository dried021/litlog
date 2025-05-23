@echo off
REM === [사용자 설정] ===
set BASE_DIR=C:\
set PROJECT_FOLDER=litlog
set SPRING_PROJECT=LitLog
set REACT_PROJECT=frontend\litlog
set DEPLOY_NAME=LitLog

REM === [경로 설정] ===
set PROJECT_DIR=%BASE_DIR%\%PROJECT_FOLDER%
set SPRING_DIR=%PROJECT_DIR%\%SPRING_PROJECT%
set REACT_DIR=%PROJECT_DIR%\%REACT_PROJECT%
set SAMBA_PATH=\\192.168.56.101\share

REM === [리눅스 SSH 설정] ===
set SSH_USER=server
set SSH_HOST=192.168.56.101
set SSH_PASS=1234
set REMOTE_SAMBA_PATH=/share
set REMOTE_TOMCAT_WEBAPPS=/usr/tomcat/webapps

echo =============================
echo [%SPRING_PROJECT% + %REACT_PROJECT% 배포 시작]
echo =============================

REM === React 빌드 ===
echo === React (%REACT_PROJECT%) 빌드 시작 ===
cd /d %REACT_DIR%
call npm install
call npm run build

REM === React → Spring 정적 리소스 복사 ===
echo === React 정적 리소스 → Spring (%SPRING_PROJECT%) 복사 중 ===
xcopy /E /Y %REACT_DIR%\dist\* %SPRING_DIR%\src\main\resources\static\

REM === Spring Boot WAR 빌드 ===
echo === Spring Boot (%SPRING_PROJECT%) WAR 빌드 중 ===
cd /d %SPRING_DIR%
call mvnw clean package

REM === 최신 WAR 파일명 찾기 ===
for /f "delims=" %%i in ('dir /b /o-d target\%SPRING_PROJECT%*.war') do (
    set WAR_FILE=%%i
    goto found
)
:found
echo === 빌드된 WAR 파일: %WAR_FILE% ===

REM === Samba 공유 폴더로 복사 ===
echo === WAR 파일을 Samba 공유로 복사 중... ===
copy "target\%WAR_FILE%" "%SAMBA_PATH%\%WAR_FILE%"

REM === SSH로 Tomcat 배포 ===
echo === Linux Tomcat 배포 중 ===
plink -ssh %SSH_USER%@%SSH_HOST% -pw %SSH_PASS% ^
"sudo systemctl stop tomcat && rm -f %REMOTE_TOMCAT_WEBAPPS%/%DEPLOY_NAME%.war && rm -rf %REMOTE_TOMCAT_WEBAPPS%/%DEPLOY_NAME% && cp %REMOTE_SAMBA_PATH%/%WAR_FILE% %REMOTE_TOMCAT_WEBAPPS%/%DEPLOY_NAME%.war && sudo systemctl start tomcat"

echo === [%DEPLOY_NAME%.war] 배포 완료 ===
pause