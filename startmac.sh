#!/bin/bash

# 1. 종료할 포트 설정
PORTS=(9090 5173)
echo "🔍 포트 점검 및 종료 중..."
for PORT in "${PORTS[@]}"; do
  PID=$(lsof -t -i:$PORT)
  if [ -n "$PID" ]; then
    echo "🚫 포트 $PORT 사용 중 → PID $PID 종료 중..."
    kill -9 $PID > /dev/null 2>&1
  else
    echo "✅ 포트 $PORT 비어 있음"
  fi
done

# 2. Spring Boot 실행
echo "🚀 Spring Boot 실행 중..."
cd backend || { echo "❌ backend 디렉토리 없음"; exit 1; }

cp ../setting.env ./setting.env 2>/dev/null

./mvnw spring-boot:run &
SPRING_PID=$!
cd ..

# 3. React 실행
echo "🌐 React 앱(dev 서버) 실행 중..."
cd frontend/litlog || { echo "❌ frontend 디렉토리 없음"; exit 1; }

npm run dev
