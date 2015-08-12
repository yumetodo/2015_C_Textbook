#pragma once
#include <stddef.h>
#ifndef _CONST_RETURN//for msys2 mingw64 clang 3.5.1.
#ifdef __cplusplus
#define _CONST_RETURN  const
#define _CRT_CONST_CORRECT_OVERLOADS
#else  /* __cplusplus */
#define _CONST_RETURN
#endif  /* __cplusplus */
#endif  /* _CONST_RETURN */
#ifdef __cplusplus
char * mystrchr(char * str, int character);
#endif
_CONST_RETURN char * mystrchr(const char * str, int character);
