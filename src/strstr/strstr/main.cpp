#include <iostream>
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
using strstr_t = _CONST_RETURN char*(*)(const char*, const char*);
void strstr_and_do(const char* str, const char* search_key, strstr_t strsearch, const char* message){
	std::cout << message << "を呼び出します" << std::endl;
	auto re = strsearch(str, search_key);
	if (nullptr == re){
		std::cout << "見つからなかったんだぜ" << std::endl;
	}
	else{
		std::cout << (re - str) + 1 << "番目で見つかったよ (" << re[0] << ")" << std::endl;
	}
}
int main(void){
	auto str = "arikitari_na_world";
	auto search_key = "world";

	std::cout << "base_str : " << str << std::endl;
	std::cout << "search_key : " << search_key << std::endl;

	strstr_and_do(str, search_key, strstr, "string.hのstrstr関数");
	strstr_and_do(str, search_key, my_strstr, "strstr.hのmy_strstr関数");
	return 0;
}