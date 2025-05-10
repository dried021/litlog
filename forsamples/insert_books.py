import os
import json
import mysql.connector
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# DB 연결 설정
db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USERNAME"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)

cursor = db.cursor()

# JSON 파일 경로
json_file_path = "./output/books.json"

def clear_table():
    """데이터베이스의 기존 데이터를 삭제"""
    sql = "DELETE FROM book WHERE NOT id = -1;"
    cursor.execute(sql)
    db.commit()
    print("Existing data cleared.")

def insert_book(book):
    sql = """
    INSERT INTO book (book_api_id, title, subtitle, authors, publisher, published_date, description, page_count, thumbnail, book_category)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    # authors를 문자열로 변환하여 저장
    authors_str = ", ".join(book.get("authors", []))

    values = (
        book.get("book_api_id"),
        book.get("title"),
        book.get("subtitle"),
        authors_str,
        book.get("publisher"),
        book.get("published_date"),
        book.get("description"),
        book.get("page_count"),
        book.get("thumbnail"),
        book.get("category_code")
    )

    cursor.execute(sql, values)
    db.commit()

def main():
    # 데이터 삭제
    clear_table()

    # JSON 파일에서 데이터 로드 및 삽입
    with open(json_file_path, "r", encoding="utf-8") as file:
        data = json.load(file)

        for book in data:
            insert_book(book)
            print(f"Inserted: {book.get('title')}")

    cursor.close()
    db.close()

if __name__ == "__main__":
    main()
