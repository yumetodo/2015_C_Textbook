#include <cstdio>
#include <cstring>
#include "strstr.h"
#ifndef _CONST_RETURN//for msys2 mingw64 clang 3.5.1.
#ifdef __cplusplus
#define _CONST_RETURN  const
#define _CRT_CONST_CORRECT_OVERLOADS
#else  /* __cplusplus */
#define _CONST_RETURN
#endif  /* __cplusplus */
#endif  /* _CONST_RETURN */
void strstr_and_do(const char* str, const char* search_key, auto (*strsearch)(const char*, const char*) -> _CONST_RETURN char*){
	auto re = strsearch(str, search_key);
	if (nullptr == re){
		puts("見つからなかったんだぜ");
	}
	else{
		const auto found_place = static_cast<unsigned int>(re - str + 1);
		printf("%d番目で見つかったよ\n", found_place);
	}
}
int main(void){
	auto str = "arikitari_na_world!";
	auto search_key = "world";

	printf("base_str : %s\n", str);
	printf("search_key : %s\n", search_key);

	puts("string.hのstrstr関数を呼び出します");
	strstr_and_do(str, search_key, strstr);
	puts("strstr.hのmy_strstr関数を呼び出します");
	strstr_and_do(str, search_key, my_strstr);
	return 0;
}