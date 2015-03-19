#include <stdio.h>
double calc_volume(double si, double s2, double s3);
int main(void){
	const double vertical = 15.5;//縦
	const double horizontal = 7.2;//横
	const double height = 2.0;//高さ
	const double result = calc_volume(vertical, horizontal, height);
	printf("体積は%fです", result);
	return 0;
}
double calc_volume(const double s1, const double s2, const double s3){
	return s1 * s2 * s3;
}
