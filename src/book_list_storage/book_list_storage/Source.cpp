#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <limits>
#include <limits.h>
#include <errno.h>//in gcc
#include <string>
#include <vector>
#include <iostream>
#include <utility>
typedef char* char_ptr;
typedef struct{
	int16_t year;
	uint8_t month;
	uint8_t day;
}date_t;
typedef struct book_data_tag book_data_t;
struct book_data_tag{
	char_ptr title;
	char_ptr author;
	char_ptr publisher;
	date_t date;
	int32_t price;
	uint64_t isbn;
	book_data_t* next;
};
book_data_t* new_book_data_t(void){
	return static_cast<book_data_t*>(malloc(sizeof(book_data_t)));
}
void delete_book_data_t(book_data_t* const data_first){
	book_data_t* buf_ptr, *work_ptr;
	for (work_ptr = data_first; nullptr != work_ptr; work_ptr = buf_ptr){
		buf_ptr = work_ptr->next;
		free(work_ptr);
	}
}
book_data_t* new_book_data_t2(void){
	book_data_t* temp = new_book_data_t();
	if (nullptr == temp) return nullptr;
	temp->title = nullptr;
	temp->author = nullptr;
	temp->publisher = nullptr;
	temp->date.year = 0;
	temp->date.month = 0;
	temp->date.day = 0;
	temp->price = 0;
	temp->isbn = 0;
	temp->next = nullptr;
	return temp;
}
inline char_ptr string_to_cstr(std::string const& in){
	char_ptr temp = static_cast<char_ptr>(malloc((in.length() + 2) * sizeof(char)));
	if (nullptr == temp) return nullptr;
#ifdef _DEBUG
	memset(temp, 0xcc, in.length() + 2);
#endif
	memcpy(temp, in.c_str(), in.length());
	temp[in.length()] = '\0';
	return temp;
}
bool set_data
(
	book_data_t* data,
	std::string const& title, std::string const& author, std::string const& publisher,
	date_t const* date, int32_t price, uint64_t isbn
){
	if (nullptr == (data->title = string_to_cstr(title))) return false;
	if (nullptr == (data->author = string_to_cstr(author))) return false;
	if (nullptr == (data->publisher = string_to_cstr(publisher))) return false;
	data->date = *date;
	data->price = price;
	data->isbn = isbn;
	data->next = nullptr;
	return true;
}
bool push_list
(
	book_data_t** current,
	std::string const& title, std::string const& author, std::string const& publisher,
	date_t const* date, int32_t price, uint64_t isbn
){
	*current = new_book_data_t();
	if (nullptr == *current) return false;
	return set_data(*current, title, author, publisher, date, price, isbn);
}
int purseInt(char const* in_str, const int max, const int min){
	errno = 0;
	const long t = strtol(in_str, nullptr, 10);
	if (0 != errno || t < min || max < t)
		return INT_MIN;
	return static_cast<int>(t);
}
unsigned int purseInt(char const* in_str, const unsigned int max, const unsigned int min, int* isError = nullptr){
	errno = 0;
	const unsigned long t = strtoul(in_str, nullptr, 10);
	if (0 != errno || max < t){
		if (nullptr != isError) *isError = INT_MIN;
		return 0;
	}
	return static_cast<unsigned int>(t);
}
int16_t purseInt(char const* in_str, const int16_t max, const int16_t min){
	const int re = purseInt(in_str, static_cast<int>(max), static_cast<int>(min));
	return (INT_MIN == re) ? INT16_MIN : static_cast<int16_t>(re);
}
uint8_t purseInt(char const* in_str, const uint8_t max, const uint8_t min, int* isError = nullptr){
	return static_cast<uint8_t>(purseInt(in_str, static_cast<unsigned int>(max), static_cast<unsigned int>(min))); 
}
uint64_t purseInt(char const* in_str, const uint64_t max, const uint64_t min, int* isError = nullptr){
	errno = 0;
	const uint64_t t = strtoull(in_str, nullptr, 10);
	if (0 != errno || max < t){
		if (nullptr != isError) *isError = INT_MIN;
		return 0;
	}	
	return t;
}
int get_integer_num(const int max, const int min){
	//機能：標準入力を数字に変換する。
	//引数：戻り値の最大値,戻り値の最小値
	//戻り値：入力した数字、エラー時は-1,EOFのときはEOF
	char s[100];
	if (nullptr == fgets(s, 100, stdin)){
		if (feof(stdin)){//エラーの原因がEOFか切り分け
			return EOF;
		}
		return INT_MIN;
	}
	if ('\n' == s[0]) return INT_MIN;
	
	return purseInt(s, max, min);
}
unsigned int get_integer_num(const unsigned int max, const unsigned int min, int* isError = nullptr){
	//機能：標準入力を数字に変換する。
	//引数：戻り値の最大値,戻り値の最小値
	//戻り値：入力した数字、エラー時は-1,EOFのときはEOF
	char s[100];
	if (nullptr == fgets(s, 100, stdin)){
		if (feof(stdin)){//エラーの原因がEOFか切り分け
			if (nullptr != isError) *isError = EOF;
			return 0;
		}
		if (nullptr != isError) *isError = INT_MIN;
		return 0;
	}
	if ('\n' == s[0]){
		if (nullptr != isError) *isError = INT_MIN;
		return 0;
	}
	return purseInt(s, max, min, isError);
}
uint64_t get_integer_num(const uint64_t max, const uint64_t min, int* isError = nullptr){
	//機能：標準入力を数字に変換する。
	//引数：戻り値の最大値,戻り値の最小値
	//戻り値：入力した数字、エラー時は-1,EOFのときはEOF
	char s[120];
	if (nullptr == fgets(s, 120, stdin)){
		if (feof(stdin)){//エラーの原因がEOFか切り分け
			if (nullptr != isError) *isError = EOF;
			return 0;
		}
		if (nullptr != isError) *isError = INT_MIN;
		return 0;
	}
	if ('\n' == s[0]){
		if (nullptr != isError) *isError = INT_MIN;
		return 0;
	}
	return purseInt(s, max, min, isError);
}
std::vector<std::string> split(const std::string &&str, char delim){
	using namespace std;
	vector<string> res;
	size_t current = 0, found;
	while ((found = str.find_first_of(delim, current)) != string::npos){
		res.push_back(string(str, current, found - current));
		current = found + 1;
	}
	res.push_back(string(str, current, str.size() - current));
	return res;
}
date_t get_ymd_from_stdin(int* isError){
	using namespace std;
	date_t re;
	puts("出版年月日を入力してください(yyyy/m/d)");
	string ymd;
	getline(cin, ymd);
	vector<string> splitted_ymd = split(move(ymd), '/');
	re.year = purseInt(splitted_ymd.at(0).c_str(), numeric_limits<int16_t>::max(), numeric_limits<int16_t>::min());
	if (nullptr != isError && INT16_MIN == re.year) *isError = INT_MIN;
	re.month = purseInt(splitted_ymd.at(1).c_str(), numeric_limits<uint8_t>::max(), static_cast<uint8_t>(0), isError);
	re.day = purseInt(splitted_ymd.at(2).c_str(), numeric_limits<uint8_t>::max(), static_cast<uint8_t>(0), isError);
	return re;
}
bool get_push_list(book_data_t** current){
	using namespace std;
	string title;
	string author;
	string publisher;
	puts("書名を入力してください");
	getline(cin, title);
	puts("著者を入力してください");
	getline(cin, author);
	puts("出版社を入力してください");
	getline(cin, publisher);
	int date_errno = 0;
	const date_t date = get_ymd_from_stdin(&date_errno);
	if (0 != date_errno) return false;
	puts("価格を入力してください");
	const int32_t price = get_integer_num(INT_MAX, INT_MIN);
	if (INT_MIN == price) return false;
	puts("ISBNを入力してください");
	int isbn_errno = 0;
	const uint64_t isbn = get_integer_num(static_cast<uint64_t>(9999999999999), static_cast<uint64_t>(0), &isbn_errno);
	if (0 != isbn_errno) return false;
	return push_list(current, title, author, publisher, &date, price, isbn);
}
void print_list(book_data_t* const print_data_first){
	for (book_data_t* print_data = print_data_first; nullptr != print_data; print_data = print_data->next){
		printf(
			"書名：%s\n"
			"著者：%s\n"
			"出版社：%s\n"
			"価格：%d\n",
			print_data->title,
			print_data->author,
			print_data->publisher,
			print_data->price
			);
#ifndef _INC__MINGW_H
		printf("ISBN：%lld\n", print_data->isbn);
#else
		printf("ISBN：%I64d\n", print_data->isbn);
#endif
	}
}
int main(void){
	book_data_t* bookdata = nullptr;//リストの宣言
	get_push_list(&bookdata);
	book_data_t * const bookdata_first = bookdata;
	bookdata = bookdata->next;
	print_list(bookdata_first);
	delete_book_data_t(bookdata_first);
	return 0;
}
