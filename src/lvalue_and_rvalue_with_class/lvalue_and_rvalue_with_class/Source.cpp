#include <iostream>
#include <cmath>//pow()
class test_class
{
public:
	test_class(double height, double weight) {
		this->height = height;
		this->weight = weight;
	}
	double& get_weight() {
		return this->weight;
	}
	const double& get_weight() const {
		return this->weight;
	}
	double& get_height() {
		return this->height;
	}
	const double& get_height() const {
		return this->height;
	}
private:
	double weight;
	double height;
};
inline double calc_bmi(double height, double weight) noexcept {
	return weight / pow(height / 100, 2.0);
}
int main() {
	test_class hoge1(170.3, 56.4);
	const test_class hoge2(158.4, 48.7);
	hoge1.get_weight() = 45;//OK. これは変更可能なlvalueへの代入. get_weight()は非constメンバー関数
	hoge2.get_weight() = 38;//error. これは変更不可能なlvalueへの代入. get_weight()はconstメンバー関数
	const auto re = calc_bmi(hoge1.get_height(), hoge1.get_weight());//OK. 変数reはlvalue
	calc_bmi(hoge1.get_height(), hoge1.get_weight()) = 7;//error. rvalueに代入はできない

	return 0;
}
