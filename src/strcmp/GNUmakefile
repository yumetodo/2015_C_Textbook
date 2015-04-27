# Makefile for strcmp.exe

TARGET 	= strcmp.exe
SRCS 	= ./strcmp/main.cpp ./strcmp/strcmp.cpp

# ��{�R�}���h
RM 		:= rm
CXX 	:= g++
CC 		:= gcc

# �f�o�b�O���ƃ����[�X���̔�����
CXX_DEBUG_FLAGS		=	-g -O0 -Wall
CXX_RELEASE_FLAGS	=	-O2

# ��{�I�v�V����
ifeq ($(CXX),gcc)
CPPFLAGS = --input-charset=utf-8 -fexec-charset=CP932 -std=c++14
else
CPPFLAGS = -std=c++14
endif

# make
# debug
.PHONY: Debug
Debug: CXXFLAGS+=$(CXX_DEBUG_FLAGS)
Debug: all
# release
.PHONY: Release
Release: CXXFLAGS+=$(CXX_RELEASE_FLAGS)
Release: all

all: $(TARGET)
$(TARGET): $(SRCS)
	$(CXX) $^ -o $@ $(CXXFLAGS) $(CPPFLAGS)

# make clean
.PHONY: clean
clean:
	$(RM) -f *.exe