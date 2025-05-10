litlog에서

vs code 확장으로 python 설치

forsamples 밑에 .env 파일을 만들어서 
원래 자신이 갖고 있는 setting.env 파일을 복사 붙여넣기

경로 이동
cd forsamples

파이썬 패키지 설치
pip install -r requirements.txt
가상환경: 버전 충돌이 우려될 경우 가상환경을 만드는 것을 추천. 그렇지 않은 경우 경고 메세지 무시해도 됨

설치 확인
pip list
깔려 있어야 하는 것:  requests, xmltodict, python-dotenv requests, mysql-connector-python, python-dotenv

litlog/forsampels에서
python main.py 실행

output 폴더에서 json / xml 파일 확인 가능