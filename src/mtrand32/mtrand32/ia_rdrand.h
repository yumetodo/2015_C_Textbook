﻿// ia_rdrand.h: Declares the types and functions for working with the RDRAND instruction on (certain) Intel processors.
//
// Author: Stephen Higgins <sjh@viathefalcon.net>
// Blog: http://blog.viathefalcon.net/
// Twitter: @viathefalcon
//
#ifndef __INTEL_COMPILER
#include <immintrin.h>
#endif

// Returns true if the host CPU supports the RDRAND instruction
bool IsRDRANDsupport();

// Invokes rdrand to generate a 32-bit unsigned random number
// Returns true if a random value was available; false otherwise
#if (defined(_MSC_VER) && _MSC_VER < 1700) || (defined(__GNUC_MAJOR__) && (__GNUC_MAJOR__ < 4 || (__GNUC_MAJOR__ == 4 && __GNUC_MINOR__ < 6)))
#ifdef _WIN64
extern "C" bool __fastcall rdrandx64(__deref_out unsigned*);

// Map rdrand to the name of the function exported from the assembled module
int __cdecl _rdrand64_step(unsigned __int64 * rnd) {
	return rdrandx64(rnd);
}
#define rdrand(param) rdrandx64( (param) )
int __cdecl _rdrand32_step(unsigned int * rnd) {
	unsigned __int64 buf;
	const int re = rdrandx64(buf);
	*rnd = (unsigned int)(buf >> 16) ^ (unsigned int)((unsigned char)(buf)) | ((unsigned int)(buf >> 40) & (unsigned int)(0xFF));
}
#else
int __cdecl _rdrand32_step(unsigned int *);
#endif
#endif