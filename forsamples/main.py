import os
import json
import requests
import xmltodict
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# Constants
GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes/"
OUTPUT_DIR = "./output/"
BOOKLIST_PATH = "./book.txt"
OUTPUT_JSON_FILE = os.path.join(OUTPUT_DIR, "books.json")
OUTPUT_XML_FILE = os.path.join(OUTPUT_DIR, "books.xml")

# API Key 가져오기
API_KEY = os.getenv("GOOGLE_BOOKS_API_KEY")

# 데이터 저장 디렉터리 생성
os.makedirs(OUTPUT_DIR, exist_ok=True)

CATEGORY_MAPPING = {
    'FICTION': ['Fiction', 'Literary', 'Thrillers', 'Romance', 'Mystery', 'Fantasy', 'Science Fiction'],
    'NONFICTION': ['Nonfiction', 'Biography & Autobiography', 'History', 'Business & Economics', 'Self-Help'],
    'CHILDRENS BOOKS': ['Juvenile Fiction', 'Juvenile Nonfiction', 'Children\'s Books'],
    'HEALTH&FITNESS': ['Health & Fitness', 'Medical', 'Diet', 'Nutrition'],
    'COOKING FOOD&WINE': ['Cooking', 'Food & Wine', 'Cookbooks'],
    'ART&PHOTOGRAPHY': ['Art', 'Photography', 'Graphic Design'],
    'MUSIC': ['Music', 'Performing Arts'],
    'RELIGION&SPIRITUALITY': ['Religion', 'Spirituality', 'Philosophy'],
    'TRAVEL': ['Travel', 'Adventure'],
    'SCIENCE': ['Science', 'Nature', 'Technology', 'Computers'],
    'etc': []
}

CATEGORY_CODE_MAPPING = {
    'FICTION': 1,
    'NONFICTION': 2,
    'CHILDRENS BOOKS': 3,
    'HEALTH&FITNESS': 4,
    'COOKING FOOD&WINE': 5,
    'ART&PHOTOGRAPHY': 6,
    'MUSIC': 7,
    'RELIGION&SPIRITUALITY': 8,
    'TRAVEL': 9,
    'SCIENCE': 10,
    'etc': 11
}


def map_category(categories):
    """Google Books API의 카테고리를 시스템의 숫자 코드로 매핑"""
    if not categories:
        return CATEGORY_CODE_MAPPING['etc']

    for category in categories:
        for key, values in CATEGORY_MAPPING.items():
            if any(value.lower() in category.lower() for value in values):
                return CATEGORY_CODE_MAPPING[key]
                
    return CATEGORY_CODE_MAPPING['etc']



def load_book_ids():
    """book.txt에서 책 ID를 로드"""
    book_ids = []
    if os.path.exists(BOOKLIST_PATH):
        with open(BOOKLIST_PATH, "r", encoding="utf-8") as file:
            book_ids = [line.strip() for line in file.readlines() if line.strip()]
    else:
        print(f"File not found: {BOOKLIST_PATH}")
    return book_ids


def fetch_book_data(book_id):
    """Google Books API에서 책 데이터를 가져오기"""
    try:
        params = {"key": API_KEY}
        response = requests.get(f"{GOOGLE_BOOKS_API_URL}{book_id}", params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching data for Book ID {book_id}: {e}")
        return {"id": book_id, "error": str(e)}


def extract_book_info(book_data):
    """API 응답에서 필요한 데이터 추출"""
    volume_info = book_data.get("volumeInfo", {})
    categories = volume_info.get("categories", [])
    category_code = map_category(categories)

    book_info = {
        "book_api_id": book_data.get("id"),
        "title": volume_info.get("title"),
        "subtitle": volume_info.get("subtitle"),
        "authors": volume_info.get("authors", []),
        "publisher": volume_info.get("publisher"),
        "published_date": volume_info.get("publishedDate"),
        "description": volume_info.get("description"),
        "page_count": volume_info.get("pageCount"),
        "thumbnail": volume_info.get("imageLinks", {}).get("thumbnail"),
        "book_category": category_code
    }
    return book_info


def save_to_json(data):
    """데이터를 JSON 파일로 저장"""
    with open(OUTPUT_JSON_FILE, "w", encoding="utf-8") as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)
    print(f"Data saved to {OUTPUT_JSON_FILE}")


def save_to_xml(data):
    """데이터를 XML 파일로 저장"""
    xml_data = xmltodict.unparse({"books": {"book": data}}, pretty=True)
    with open(OUTPUT_XML_FILE, "w", encoding="utf-8") as xml_file:
        xml_file.write(xml_data)
    print(f"Data saved to {OUTPUT_XML_FILE}")


def main():
    if not API_KEY:
        print("Error: GOOGLE_BOOKS_API_KEY is missing.")
        return
    
    book_ids = load_book_ids()

    if not book_ids:
        print("book.txt is empty or not found.")
        return

    book_data_list = []

    for book_id in book_ids:
        book_data = fetch_book_data(book_id)
        book_info = extract_book_info(book_data)
        book_data_list.append(book_info)

    save_to_json(book_data_list)
    save_to_xml(book_data_list)


if __name__ == "__main__":
    main()
