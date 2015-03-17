#include <windows.h>
#include <stdio.h>
#include <time.h>
#ifndef __GNUC__
#pragma comment(lib, "setupapi.lib")
#pragma comment(lib, "hid.lib")
#pragma comment(lib, "winmm.lib")
#endif
#define TEST_TIME 1000000000
void floatloop(void)
{
	int     i;
	float   r = 0.0;

	for (i = 0; i < TEST_TIME; ++i)
		r += (float)0.1;
	printf("r=%g\n", r);
}

void doubleloop(void)
{
	int     i;
	double  r = 0.0;

	for (i = 0; i < TEST_TIME; ++i)
		r += 0.1;
	printf("r=%g\n", r);
}
int main(void)
{
	clock_t startTimef, startTimed, endTimef, endTimed;
	timeBeginPeriod(1);

	startTimef = clock();
	floatloop();
	endTimef = clock();

	startTimed = clock();
	doubleloop();
	endTimed = clock();

	timeEndPeriod(1);
	printf("float:%ld\ndouble:%ld\n", endTimef - startTimef, endTimed - startTimed);
	printf("float:%lf[sec.]\ndouble:%lf[sec.]\n", (double)(endTimef - startTimef) / CLOCKS_PER_SEC, (double)(endTimed - startTimed) / CLOCKS_PER_SEC);
	return 0;
}
