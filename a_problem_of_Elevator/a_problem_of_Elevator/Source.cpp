#include <iostream>
using uint = unsigned int;
class ev_state_c
{
public:
	ev_state_c(uint weight, uint num_of_person) {
		this->weight = weight;
		this->num_of_person = num_of_person;
	}
	bool operator < (const ev_state_c& ref) const{
		return ((this->num_of_person < ref.num_of_person) && (this->weight < ref.weight));
	}
	const ev_state_c operator - (const ev_state_c& ref) const{
		return ev_state_c(this->weight - ref.weight, this->num_of_person - ref.num_of_person);
	}
	ev_state_c& operator += (const ev_state_c& ref) {
		this->weight += ref.weight;
		this->num_of_person += ref.num_of_person;
		return *this;
	}
private:
	uint num_of_person;
	uint weight;
};
ev_state_c make_ev_state_c_from_cin() {
	std::cout << "重量(kg)を入力してください" << std::endl;
	uint buf;
	std::cin >> buf;
	return ev_state_c(buf, 1);
}
ev_state_c ask_lim() {
	std::cout << "定員を入力してください" << std::endl;
	uint num_of_person;
	std::cin >> num_of_person;
	std::cout << "重量制限(kg)を入力してください" << std::endl;
	uint weight;
	std::cin >> weight;
	return ev_state_c(weight, num_of_person);
}
int main() {
	ev_state_c buf(0, 0);
	const auto lim = ask_lim();
	for (ev_state_c i(0, 0); i < (lim - (buf = make_ev_state_c_from_cin())); i += buf);
	std::cout << "もう乗り切れないよ" << std::endl;
	return 0;
}