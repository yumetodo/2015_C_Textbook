#include "strstr.h"
#include <limits>
#ifndef _CONST_RETURN//for msys2 mingw64 clang 3.5.1.
#ifdef __cplusplus
#define _CONST_RETURN  const
#define _CRT_CONST_CORRECT_OVERLOADS
#else  /* __cplusplus */
#define _CONST_RETURN
#endif  /* __cplusplus */
#endif  /* _CONST_RETURN */
_CONST_RETURN char *my_strstr(const char *str, const char *strSearch){
	if (nullptr == str || nullptr == strSearch) return nullptr;
	size_t i, j;
	const auto search_limits = std::numeric_limits<size_t>::max();//無限ループ防止
	for (i = 0, j= 0; search_limits != i && '\0' != str[i] && '\0' != strSearch[j]; i++){//正規のbreak条件は'\0' == strSearch[j]
		for (
			j = 0; 
			search_limits - 1 != i && search_limits != j && '\0' != str[i] && '\0' != strSearch[j] && str[i] == strSearch[j];
			i++, j++
		);
	}
	return ('\0' != strSearch[j]) ? nullptr : &str[i - j - 1];//この時必ずi > jとなる。さもなくばreturnはnullptr
}