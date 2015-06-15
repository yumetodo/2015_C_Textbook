// ia_rdrand.cpp: Implements the functions for working with the RDRAND instruction on (certain) Intel processors.
//
// Author: Stephen Higgins <sjh@viathefalcon.net>
// Blog: http://blog.viathefalcon.net/
// Twitter: @viathefalcon
//

#ifndef __INTEL_COMPILER
#include <immintrin.h>
#include <intrin.h>
#ifdef __GNUC__
#include <cpuid.h>
#endif //__GNUC__
#endif //__INTEL_COMPILER
#include <string.h>
#include <stdint.h>
#include "ia_rdrand.h"

// Defines the bit mask used to examine the ecx register returned by cpuid.
// (The 30th bit is set.)
constexpr uint32_t RDRAND_MASK = 0x40000000;

typedef struct { uint32_t EAX, EBX, ECX, EDX; } regs_t;
regs_t get_cpuid(unsigned int level) {
	regs_t re = { 0 };
	static_assert(sizeof(re) == (sizeof(uint32_t) * 4), "illegal size of struct regs_t ");
#if ( defined(__INTEL_COMPILER) || defined(_MSC_VER) )
	__cpuid(reinterpret_cast<int*>(&re), static_cast<int>(level));
#elif defined(__GNUC__)
	__get_cpuid(level, &re.EAX, &re.EBX, &re.ECX, &re.EDX);//error: '__get_cpuid' was not declared in this scope
#endif
	return re;
}
bool IsIntelCPU() {
	const auto id = get_cpuid(0);
	uint32_t vender[4] = { id.EAX, id.ECX, id.EBX , 0 };
	return (0 == strcmp(reinterpret_cast<char*>(vender), "GenuineIntel"));
}
bool IsRDRANDsupport() {
	if (!IsIntelCPU()) return false;
	const auto reg = get_cpuid(1);
	return (RDRAND_MASK == (reg.ECX & RDRAND_MASK));
}
//gcc:4.6,VC:2013
#if (defined(_MSC_VER) && _MSC_VER < 1700) || (defined(__GNUC_MAJOR__) && (__GNUC_MAJOR__ < 4 || (__GNUC_MAJOR__ == 4 && __GNUC_MINOR__ < 6)))
#ifndef _WIN64
// Defines the RDRAND instruction in terms of its opcode
#define rdrand_eax	__asm _emit 0x0F __asm _emit 0xC7 __asm _emit 0xF0

bool rdrand(__deref_out unsigned* dest) {

	__asm {
			xor eax, eax		; //Indicate to VC++ that we'll be using EAX, EDX
			xor edx, edx;

			rdrand_eax			; Get the random value into EAX
			jc rdrand_rslt		; If a value was available, jump down
			mov eax, 0			; //Set the result (false)
			jmp rdrand_ret		; Jump over the next bit to get out of the function

	rdrand_rslt:
			mov edx, dest		; Move the address in the dest parameter into EDX
			mov [edx], eax		; Move the random value from EAX into the destination address (now in EDX)
			mov eax, 1			; //Set the result (true)

	rdrand_ret:
			; Fall out here
	}

	// Return here with the result in EAX
	;
}
inline int __cdecl _rdrand32_step(unsigned int * rnd) {
	return rdrand(rnd);
}
#endif
#endif
