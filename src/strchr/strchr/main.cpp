#include "strchr.h"
#include <cstdio>
#include <cstring>
using strchr_t = char* (*)(char*, int);
template<size_t SIZE>void replace_newline_char(char (&str)[SIZE], const char* func_name, strchr_t func) {
	printf("関数名: %s\n", func_name);
	printf("Before: %s\n", str);
	func(str, '\n')[0] = '\0';
	printf("After: %s\n", str);
}
int main() {
	constexpr size_t arr_size = 1024;
	char str1[arr_size], str2[arr_size];
	puts("文字列を入力してください");
	fgets(str1, arr_size, stdin);
	memcpy(str2, str1, strlen(str1) + 1);

	replace_newline_char(str1, "strchr", strchr);
	replace_newline_char(str2, "mystrchr", mystrchr);

	return 0;
}
