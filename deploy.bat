@echo off
REM === [����� ����] ===
set BASE_DIR=C:\
set PROJECT_FOLDER=litlog
set SPRING_PROJECT=LitLog
set REACT_PROJECT=frontend\litlog
set DEPLOY_NAME=LitLog

REM === [��� ����] ===
set PROJECT_DIR=%BASE_DIR%\%PROJECT_FOLDER%
set SPRING_DIR=%PROJECT_DIR%\%SPRING_PROJECT%
set REACT_DIR=%PROJECT_DIR%\%REACT_PROJECT%
set SAMBA_PATH=\\192.168.56.101\share

REM === [������ SSH ����] ===
set SSH_USER=server
set SSH_HOST=192.168.56.101
set SSH_PASS=1234
set REMOTE_SAMBA_PATH=/share
set REMOTE_TOMCAT_WEBAPPS=/usr/tomcat/webapps

echo =============================
echo [%SPRING_PROJECT% + %REACT_PROJECT% ���� ����]
echo =============================

REM === React ���� ===
echo === React (%REACT_PROJECT%) ���� ���� ===
cd /d %REACT_DIR%
call npm install
call npm run build

REM === React �� Spring ���� ���ҽ� ���� ===
echo === React ���� ���ҽ� �� Spring (%SPRING_PROJECT%) ���� �� ===
xcopy /E /Y %REACT_DIR%\dist\* %SPRING_DIR%\src\main\resources\static\

REM === Spring Boot WAR ���� ===
echo === Spring Boot (%SPRING_PROJECT%) WAR ���� �� ===
cd /d %SPRING_DIR%
call mvnw clean package

REM === �ֽ� WAR ���ϸ� ã�� ===
for /f "delims=" %%i in ('dir /b /o-d target\%SPRING_PROJECT%*.war') do (
    set WAR_FILE=%%i
    goto found
)
:found
echo === ����� WAR ����: %WAR_FILE% ===

REM === Samba ���� ������ ���� ===
echo === WAR ������ Samba ������ ���� ��... ===
copy "target\%WAR_FILE%" "%SAMBA_PATH%\%WAR_FILE%"

REM === SSH�� Tomcat ���� ===
echo === Linux Tomcat ���� �� ===
plink -ssh %SSH_USER%@%SSH_HOST% -pw %SSH_PASS% ^
"sudo systemctl stop tomcat && rm -f %REMOTE_TOMCAT_WEBAPPS%/%DEPLOY_NAME%.war && rm -rf %REMOTE_TOMCAT_WEBAPPS%/%DEPLOY_NAME% && cp %REMOTE_SAMBA_PATH%/%WAR_FILE% %REMOTE_TOMCAT_WEBAPPS%/%DEPLOY_NAME%.war && sudo systemctl start tomcat"

echo === [%DEPLOY_NAME%.war] ���� �Ϸ� ===
pause