#include <iostream>
#include <cstdio>
#include <cstring>
#include "strcmp.h"
using strcmp_t = int (*)(const char*, const char*);
void strstr_and_do(const char* str1, const char* str2, strcmp_t strcomare, const char* message){
	std::cout << message << "を呼び出します" << std::endl;
	const auto re = strcomare(str1, str2);
	if (0 == re){
		std::cout << "\"" << str1 << "\", \"" << str2 << "\" は一致しました" << std::endl;
	}
	else{
		std::cout << re << " = strcmp(\"" << str1 << "\", \"" << str2 << "\")  戻り値 :" << ((re > 0) ? '>' : '<') << "0" << std::endl;
	}
}
int main(void){
	auto str1 = "arikitari_na_world!";
	const char* str2[] = { "akrikitariahanai", "arikitari_na_world", "arikitari_na_world!", "arikitari_na_world!!", "arikitari_na_world_" };

	for (auto i : str2){
		strstr_and_do(str1, i, strcmp, "string.hのstrcmp関数");
		strstr_and_do(str1, i, my_strcmp, "strcmp.hのmy_strcmp関数");
		std::cout << std::endl;
	}
	return 0;
}
