/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 * Changed by yumetodo
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush(){
		// Copyright 2006 Shin, YoungJin
	
		var reserved = 	'__stdcall __cdecl alignas alignof and and_eq asm _asm auto bitand bitor ' + 
						' bool break case catch class compl constexpr const const_cast continue __declspec decltype constexpr ' +
						'default delete deprecated dllexport dllimport do dynamic_cast else enum __exception ' +
						'explicit export extern __finally false for friend goto if inline ' +
						'mutable naked namespace new noinline noreturn not nothrow not_eq nullptr ' +
						'operator or or_eq private protected public register reinterpret_cast return selectany ' +
						'sizeof static static_cast static_assert　struct switch template this thread throw true ' +
						'try __try typedef typeid typename union using uuid virtual volatile ' +
						'while xor xor_eq signed unsigned bool char __int8 short __int16 ' + 
						'__wchar_t wchar_t int __int32 long __int64 void float double ' +
						'noexcept ' +
						'static_if ';//N4661

		var macro = 	'errno AVSC_INLINE DEBUG NDEBUG NULL EOF　stdin stdout stderr tin tout ' +
						'terr tlog __DATE__ __FILE__ __LINE__ __STDC__ __TIME__ __TIMESTAMP__ _ATL_VER __AVX__ ' +
						'__AVX2__ _CHAR_UNSIGNED __CLR_VER __cplusplus_cli __cplusplus_winrt __COUNTER__ __cplusplus _CPPRTTI _CPPUNWIND _DEBUG ' +
						'_DLL __FUNCDNAME__ __FUNCSIG__ __FUNCTION__ _INTEGRAL_MAX_BITS _M_AMD64 _M_ARM _M_CEE _M_CEE_PURE _M_CEE_SAFE ' +
						'_M_IX86 _M_ARM_FP _M_IX86_FP _M_X64 _MANAGED _MFC_VER _MSC_BUILD _MSC_EXTENSIONS _MSC_FULL_VER _MSC_VER ' +
						'__MSVC_RUNTIME_CHECKS _MT _NATIVE_WCHAR_T_DEFINED _OPENMP _VC_NODEFAULTLIB _WCHAR_T_DEFINED _WIN32 _WIN64 _Wp64 CHAR_BIT ' +
						'SCHAR_MIN SCHAR_MAX UCHAR_MAX CHAR_MIN CHAR_MAX MB_LEN_MAX SHRT_MIN SHRT_MAX USHRT_MAX INT_MIN ' +
						'INT_MAX UINT_MAX LONG_MIN LONG_MAX ULONG_MAX LLONG_MAX LLONG_MIN ULLONG_MAX _I8_MIN _I8_MAX ' +
						'_UI8_MAX _I16_MIN _I16_MAX _UI16_MAX _I32_MIN _I32_MAX _UI32_MAX _I64_MIN _I64_MAX _UI64_MAX ' +
						'SIZE_MAX RSIZE_MAX FLT_EVAL_METHOD DBL_DIG DBL_EPSILON DBL_MANT_DIG DBL_MAX DBL_MAX_10_EXP DBL_MAX_EXP DBL_MIN ' +
						'DBL_MIN_10_EXP DBL_MIN_EXP _DBL_RADIX _DBL_ROUNDS FLT_DIG FLT_EPSILON FLT_GUARD FLT_MANT_DIG FLT_MAX FLT_MAX_10_EXP ' +
						'FLT_MAX_EXP FLT_MIN FLT_MIN_10_EXP FLT_MIN_EXP FLT_NORMALIZE FLT_RADIX FLT_ROUNDS LDBL_DIG LDBL_EPSILON LDBL_MANT_DIG ' +
						'LDBL_MAX LDBL_MAX_10_EXP LDBL_MAX_EXP LDBL_MIN LDBL_MIN_10_EXP LDBL_MIN_EXP _LDBL_RADIX _LDBL_ROUNDS DECIMAL_DIG _clear87 ' +
						'_status87 _SW_INEXACT _SW_UNDERFLOW _SW_OVERFLOW _SW_ZERODIVIDE _SW_INVALID _SW_DENORMAL _EM_AMBIGUIOUS _EM_AMBIGUOUS _MCW_EM ' +
						'_EM_INEXACT _EM_UNDERFLOW _EM_OVERFLOW _EM_ZERODIVIDE _EM_INVALID _EM_DENORMAL _MCW_RC _RC_NEAR _RC_DOWN _RC_UP ' +
						'_RC_CHOP _MCW_PC _PC_64 _PC_53 _PC_24 _MCW_IC _IC_AFFINE _IC_PROJECTIVE _MCW_DN _DN_SAVE ' +
						'_DN_FLUSH _DN_FLUSH_OPERANDS_SAVE_RESULTS _DN_SAVE_OPERANDS_FLUSH_RESULTS _SW_UNEMULATED _SW_SQRTNEG _SW_STACKOVERFLOW _SW_STACKUNDERFLOW _FPE_INVALID _FPE_DENORMAL _FPE_ZERODIVIDE ' +
						'_FPE_OVERFLOW _FPE_UNDERFLOW _FPE_INEXACT _FPE_UNEMULATED _FPE_SQRTNEG _FPE_STACKOVERFLOW _FPE_STACKUNDERFLOW _FPE_EXPLICITGEN _FPE_MULTIPLE_TRAPS _FPE_MULTIPLE_FAULTS ' +
						'_FPCLASS_SNAN _FPCLASS_QNAN _FPCLASS_NINF _FPCLASS_NN _FPCLASS_ND _FPCLASS_NZ _FPCLASS_PZ _FPCLASS_PD _FPCLASS_PN _FPCLASS_PINF ' +
						'clear87 status87 control87 DBL_RADIX DBL_ROUNDS LDBL_RADIX LDBL_ROUNDS EM_AMBIGUIOUS EM_AMBIGUOUS MCW_EM ' +
						'EM_INVALID EM_DENORMAL EM_ZERODIVIDE EM_OVERFLOW EM_UNDERFLOW EM_INEXACT MCW_IC IC_AFFINE IC_PROJECTIVE MCW_RC ' +
						'RC_CHOP RC_UP RC_DOWN RC_NEAR MCW_PC PC_24 PC_53 PC_64 CW_DEFAULT SW_INVALID ' +
						'SW_DENORMAL SW_ZERODIVIDE SW_OVERFLOW SW_UNDERFLOW SW_INEXACT SW_UNEMULATED SW_SQRTNEG SW_STACKOVERFLOW SW_STACKUNDERFLOW FPE_INVALID ' +
						'FPE_DENORMAL FPE_ZERODIVIDE FPE_OVERFLOW FPE_UNDERFLOW FPE_INEXACT FPE_UNEMULATED FPE_SQRTNEG FPE_STACKOVERFLOW FPE_STACKUNDERFLOW FPE_EXPLICITGEN ' +
						'ATOMIC_CHAR_LOCK_FREE ATOMIC_CHAR_LOCK_FREE ATOMIC_CHAR_LOCK_FREE ATOMIC_CHAR16_T_LOCK_FREE ATOMIC_CHAR32_T_LOCK_FREE ATOMIC_WCHAR_T_LOCK_FREE ATOMIC_SHORT_LOCK_FREE ATOMIC_SHORT_LOCK_FREE ATOMIC_INT_LOCK_FREE ATOMIC_INT_LOCK_FREE ' +
						'ATOMIC_LONG_LOCK_FREE ATOMIC_LONG_LOCK_FREE ATOMIC_LLONG_LOCK_FREE ATOMIC_LLONG_LOCK_FREE ' +
						'_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES_COUNT _CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES __GNUC__ __GNUC_MINOR__ __GNUC_PATCHLEVEL__ _countof ' + 
						'KEY_INPUT_ESCAPE _CONST_RETURN __ICC __clang__ __clang_major__ __clang_minor__ __bool_true_false_are_defined _CRT_RAND_S ' +
						'BOOST_VERSION BOOST_ASIO_ERROR_CATEGORY_NOEXCEPT BOOST_NOEXCEPT BOOST_ASIO_MSVC BOOST_USER_CONFIG BOOST_COMPILER_CONFIG BOOST_STDLIB_CONFIG ' +//Boost
						'BOOST_PLATFORM_CONFIG BOOST_HAS_PRAGMA_ONCE __REQUIRED_RPCNDR_H_VERSION__ __REQUIRED_RPCSAL_H_VERSION__ BOOST_MPL_AUX_LAMBDA_SUPPORT ' +
						'BOOST_ASIO_MOVE_CAST BOOST_ASIO_WRITE_HANDLER_CHECK ';

		var typedefined = '' +
						//Standerd C
						'clock_t _complex _dev_t ' +
						'_diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t ' +
						'__finddata64_t __wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t jmp_buf mbstate_t ' +
						'_off_t _onexit_t _PNH ptrdiff_t _purecall_handler sig_atomic_t size_t _stat __stat64 _stati64 ' +
						'terminate_function time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf va_list ' +
						'wctrans_t wctype_t wint_t int8_t int16_t int32_t int64_t uint8_t uint16_t uint32_t uint64_t ' +
						'int_least8_t int_least16_t int_least32_t int_least64_t uint_least8_t uint_least16_t uint_least32_t uint_least64_t ' +
						'int_fast8_t int_fast16_t int_fast32_t int_fast64_t uint_fast8_t uint_fast16_t uint_fast32_t uint_fast64_t ' +
						'intmax_t uintmax_t _BOOL ' +
						//C++ STL
						'atomic_char atomic_schar atomic_uchar atomic_char16_t ' +
						'atomic_char32_t atomic_wchar_t atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong ' +
						'atomic_int8_t atomic_uint8_t atomic_int16_t atomic_uint16_t atomic_int32_t atomic_uint32_t atomic_int64_t atomic_uint64_t atomic_int_least8_t atomic_uint_least8_t ' +
						'atomic_int_least16_t atomic_uint_least16_t atomic_int_least32_t atomic_uint_least32_t atomic_int_least64_t atomic_uint_least64_t atomic_int_fast8_t atomic_uint_fast8_t atomic_int_fast16_t atomic_uint_fast16_ ' +
						'atomic_int_fast32_t atomic_uint_fast32_t atomic_int_fast64_t atomic_uint_fast64_t atomic_intptr_t atomic_uintptr_t atomic_size_t atomic_ptrdiff_t atomic_intmax_t atomic_uintmax_t ' +
						'atomic atomic_flag memory_order duration steady_clock time_point common_type duration_values system_clock treat_as_floating_point ' +
						'codecvt_utf8 codecvt_utf8_utf16 codecvt_utf16 complex wbuffer_convert wstring_convert deque exception_ptr terminate_handler unexpected_handler ' +
						'bad_exceptionClass exception path wpath filesystem_error wfilesystem_error directory_entry wdirectory_entry directory_iterator wdirectory_iterator ' +
						'recursive_directory_iterator wrecursive_directory_iterator basic_directory_entry basic_directory_iterator basic_filesystem_error basic_path basic_recursive_directory_iterator file_status colon dot ' +
						'is_basic_path path_traits slash space_info wpath_traits forward_list filebuf fstream ifstream ofstream ' +
						'wfstream wifstream wofstream wfilebuf basic_filebuf basic_fstream basic_ifstream basic_ofstream bad_function_call binary_negate ' +
						'binder1st binder2nd const_mem_fun_ref_t const_mem_fun_t const_mem_fun1_ref_t const_mem_fun1_t function hash is_bind_expression is_placeholder ' +
						'mem_fun_ref_t mem_fun_t mem_fun1_ref_t mem_fun1_t pointer_to_binary_function pointer_to_unary_function reference_wrapper result_of unary_negate hash_compare ' +
						'value_compare hash_map hash_multimap initializer_list ios streamoff streampos streamsize wios wstreampos ' +
						'basic_ios fpos ios_base basic_ios ios basic_streambuf streambuf basic_istream istream basic_ostream ' +
						'ostream basic_iostream iostream basic_stringbuf stringbuf basic_istringstream istringstream basic_ostringstream ostringstream basic_stringstream ' +
						'stringstream basic_filebuf filebuf basic_ifstream ifstream basic_ofstream ofstream basic_fstream fstream wios ' +
						'wstreambuf wistream wostream wiostream wstringbuf wistringstream wostringstream wstringstream wfilebuf wifstream ' +
						'wofstream wfstream codecvt codecvt_base codecvt_byname collate collate_byname ctype ctype ctype_base ' +
						'ctype_byname locale messages messages_base messages_byname money_base money_get value_compare map multimap ' +
						'call_once lock adopt_lock_t defer_lock_t once_flag try_to_lock_t new_handler priority_queue random_device ' +
						'mt19937 bernoulli_distribution binomial_distribution cauchy_distribution chi_squared_distribution discard_block_engine discrete_distribution exponential_distribution extreme_value_distribution fisher_f_distribution ' +
						'gamma_distribution generate_canonical geometric_distribution independent_bits_engine linear_congruential_engine lognormal_distribution mersenne_twister_engine negative_binomial_distribution normal_distribution piecewise_constant_distribution ' +
						'piecewise_linear_distribution poisson_distribution random_device seed_seq shuffle_order_engine student_t_distribution subtract_with_carry_engine uniform_int_distribution uniform_real_distribution weibull_distribution ' +
						'ratio cmatch cregex_iterator cregex_token_iterator csub_match regex smatch sregex_iterator sregex_token_iterator ssub_match ' +
						'wcmatch wcregex_iterator wcregex_token_iterator wcsub_match wregex wsmatch wsregex_iterator wsregex_token_iterator wssub_match basic_regex ' +
						'match_results regex_constants regex_error regex_iterator regex_traits regex_traits regex_traits regex_token_iterator sub_match scoped_allocator_adaptor ' +
						'set multiset stack domain_error invalid_argument length_error logic_error out_of_range overflow_error range_error ' +
						'runtime_error underflow_error streambuf wstreambuf basic_streambuf string wstring u16string u32string basic_string ' +
						'char_traits errc error_category error_code error_condition is_error_code_enum is_error_condition_enum system_error thread hash ' +
						'tuple tuple_element tuple_size add_const add_cv add_pointer add_reference add_volatile aligned_storage alignment_of ' +
						'common_type conditional decay enable_if extent has_nothrow_assign has_nothrow_constructor has_nothrow_copy has_nothrow_copy_constructor has_nothrow_default_constructor ' +
						'has_trivial_assign has_trivial_constructor has_trivial_copy has_trivial_copy_constructor has_trivial_default_constructor has_trivial_destructor has_virtual_destructor is_abstract is_arithmetic is_array ' +
						'is_base_of is_class is_compound is_const is_convertible is_empty is_enum is_floating_point is_function is_fundamental ' +
						'is_integral is_lvalue_reference is_member_function_pointer is_member_object_pointer is_member_pointer is_object is_pod is_pointer is_polymorphic is_reference ' +
						'is_rvalue_reference is_same is_scalar is_signed is_standard_layout is_union is_unsigned is_void is_volatile make_signed ' +
						'make_unsigned rank remove_all_extents remove_const remove_cv remove_extent remove_pointer remove_reference remove_volatile integral_constant ' +
						'false_type true_type unordered_map unordered_multimap unordered_multiset unordered_set tuple_element tuple_size identity pair ' +
					    'gslice gslice_array indirect_array mask_array slice valarray vector bitset numeric_limits auto_ptr unique_ptr shared_ptr ' +
					    'forward enable_shared_from_this ' +
						//SIMD
						'__m128 __m128i __m128d __m256 __m256i __m256d ' + 
						//AviUtl
						'INPUT_PLUGIN_TABLE INPUT_HANDLE FILTER_DLL EXFUNC AVI_FILE_HANDLE SYS_INFO FILE_INFO FRAME_STATUS FILTER_PROC_INFO ' +
						'COLOR_PLUGIN_TABLE COLOR_PROC_INFO MULTI_THREAD_FUNC PIXEL_YC ' +
						//Win32api
						'ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR ' +
						'DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH HCOLORSPACE HCONV ' +
						'HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP HENHMETAFILE HFILE HFONT ' +
						'HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY HKL HLOCAL HMENU HMETAFILE ' +
						'HMODULE HMONITOR HPALETTE HPEN HRESULT HRGN HRSRC HSZ HWINSTA HWND ' +
						'INT INT_PTR INT32 INT64 LANGID LCID LCTYPE LGRPID LONG LONGLONG ' +
						'LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF LPCSTR LPCTSTR LPCVOID ' +
						'LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR LPVOID LPWORD LPWSTR ' +
						'LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR PDWORDLONG PDWORD_PTR ' +
						'PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT PINT_PTR PINT32 PINT64 ' +
						'PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 POINTER_64 PSHORT PSIZE_T ' +
						'PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR PUINT PUINT_PTR PUINT32 ' +
						'PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 PUSHORT PVOID PWCHAR PWORD ' +
						'PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT SIZE_T SOCKET SSIZE_T TBYTE TCHAR ' +
						'UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG ULONGLONG ULONG_PTR ULONG32 ' +
						'ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM BITMAP errno_t ' +
						'BITMAPINFO BITMAPINFOHEADER BITMAPFILEHEADER RECT HWND HDC ' +
						'WAVEFORMATEX IID ' +
						//FFmpeg
						'AVFormatContext AVMediaType AVCodecID AVPacket AVCodecContext MyAVPacketList PacketQueue AudioParams ' +
						'Clock Frame FrameQueue Decoder show_mode VideoState SDL_AudioSpec ' +
						'AVAudioResampleContext AVMixCoeffType AVResampleFilterType AVResampleDitherMethod ' +
						'AVS_Library AVS_ShutdownFunc AVS_ApplyFunc AVS_Value AVS_ScriptEnvironment AVS_VideoInfo AVS_Clip AVS_FilterInfo AVSC_CC ' +
						'IScriptEnvironment AVFrame AVPicture AVS_VideoFrameBuffer AVS_VideoFrame ' +
						'AVSampleFormat AVPixelFormat IClip PClip PVideoFrame VideoInfo AVCodec AVStream ' +
						//L-smash
						//L-SMASH-Works
						'lsmash_reader_t video_option_t lsmash_handler_t audio_option_t ' +
						'dummy_handler_t au_video_output_handler_t yuv420_list func_convert_yuv420ple_i_to_yuv444p16le lwlibav_file_handler_t ' +
						'lsmash_file_parameters_t lsmash_movie_parameters_t lsmash_root_t ' +
						'lsmash_file_t Pixel Pixel32 Pixel8 PixCoord PixDim PixOffset SFLOAT libavsmash_audio_output_handler_t libavsmash_video_scaler_handler_t ' +
						'libavsmash_video_output_handler_t lwlibav_audio_output_handler_t lwlibav_video_scaler_handler_t lwlibav_video_output_handler_t ' +
						'progress_handler_t lw_log_handler_t AVSValue lw_audio_output_handler_t extended_summary_t libavsmash_summary_t ' +
						'codec_configuration_t libavsmash_audio_decode_handler_t order_converter_t libavsmash_video_decode_handler_t lwlibav_option_t ' +
						'audio_frame_info_t lwlibav_audio_decode_handler_t lwlibav_extradata_t lwlibav_extradata_handler_t lwlibav_decode_handler_t ' +
						'lw_field_info_t video_frame_info_t order_converter_t lwlibav_video_decode_handler_t progress_indicator_t audio_samples_t ' +
						'lw_video_scaler_handler_t lw_video_frame_order_t lw_video_output_handler_t as_video_output_handler_t ' +
						'as_video_buffer_handler_t lwindex_helper_t video_timestamp_t video_timestamp_temp_t lw_log_level ' +
						'output_colorspace_tag output_colorspace_index ' +
						'PIXEL_LW48 lsmash_media_parameters_t libavsmash_handler_t libavsmash_audio_info_handler_t libavsmash_video_info_handler_t ' +
					    //boost.asio
					    'const_buffer tcp endpoint acceptor socket io_service async_result async_result_init handler_type async_result_type_helper AsyncStatus ' +
					    'RPC_IF_HANDLE IAsyncInfo IInspectable win_event posix_event std_event null_event event atomic_count basic_handle native_type ' +
					    'native_handle_type lowest_layer_type' +
					    'io_service basic_io_object basic_object_handle basic_random_access_handle type_check' +
					    'ObjectHandleService HandleService WaitHandler RandomAccessHandleService ConstBufferSequence '+//Boost.asio template
					    //Boost.mpl
					    'distance_impl apply msvc_eti_base iter_fold iterator_range long_ distance encode_type_impl ' +
					    'decode_type_impl decode_nested_template_helper_impl encode_type decode_type ' +
					    //Boost
					    'enable_if_c lazy_enable_if_c disable_if_c lazy_disable_if_c ' +
					    //DxLib(DxLib.h)
					    'waveformat_tag WAVEFORMAT PWAVEFORMAT NEAR NPWAVEFORMAT FAR LPWAVEFORMAT ' +
					    'tagIMEINPUTCLAUSEDATA IMEINPUTCLAUSEDATA LPIMEINPUTCLAUSEDATA tagIMEINPUTDATA IMEINPUTDATA LPIMEINPUTDATA ' +
					    'tagDRAWCHARINFO DRAWCHARINFO LPDRAWCHARINFO tagDISPLAYMODEDATA DISPLAYMODEDATA LPDISPLAYMODEDATA ' +
					    'tagDATEDATA DATEDATA LPDATEDATA tagFILEINFO FILEINFO LPFILEINFO tagFILEINFOW FILEINFOW LPFILEINFOW ' +
					    'tagMATRIX MATRIX LPMATRIX MATRIX_D LPMATRIX_D tagVECTOR VECTOR LPVECTOR FLOAT3 LPFLOAT3 ' +
					    'tagVECTOR_D VECTOR_D LPVECTOR_D DOUBLE3 LPDOUBLE3 tagFLOAT2 FLOAT2 ' +
					    'tagCOLOR_F COLOR_F LPCOLOR_F tagCOLOR_U8 COLOR_U8 tagFLOAT4 FLOAT4 tagDOUBLE4 DOUBLE4 LPDOUBLE4 tagINT4 INT4 ' +
					    'tagVERTEX2D VERTEX2D LPVERTEX2D tagVERTEX2DSHADER VERTEX2DSHADER LPVERTEX2DSHADER tagVERTEX VERTEX tagVERTEX_3D VERTEX_3D LPVERTEX_3D ' +
					    'tagVERTEX3D VERTEX3D LPVERTEX3D tagVERTEX3DSHADER VERTEX3DSHADER LPVERTEX3DSHADER tagLIGHTPARAM LIGHTPARAM tagMATERIALPARAM MATERIALPARAM ' +
					    'tagHITRESULT_LINE HITRESULT_LINE tagHITRESULT_LINE_D HITRESULT_LINE_D ' +
					    'tagSEGMENT_SEGMENT_RESULT SEGMENT_SEGMENT_RESULT tagSEGMENT_SEGMENT_RESULT_D SEGMENT_SEGMENT_RESULT_D ' +
					    'tagSEGMENT_POINT_RESULT SEGMENT_POINT_RESULT tagSEGMENT_POINT_RESULT_D SEGMENT_POINT_RESULT_D tagSEGMENT_TRIANGLE_RESULT SEGMENT_TRIANGLE_RESULT ' +
					    'tagSEGMENT_TRIANGLE_RESULT_D SEGMENT_TRIANGLE_RESULT_D tagTRIANGLE_POINT_RESULT TRIANGLE_POINT_RESULT ' +
					    'tagTRIANGLE_POINT_RESULT_D TRIANGLE_POINT_RESULT_D tagPLANE_POINT_RESULT PLANE_POINT_RESULT tagPLANE_POINT_RESULT_D PLANE_POINT_RESULT_D ' +
					    'tagMV1_COLL_RESULT_POLY MV1_COLL_RESULT_POLY tagMV1_COLL_RESULT_POLY_DIM MV1_COLL_RESULT_POLY_DIM tagMV1_REF_VERTEX MV1_REF_VERTEX ' +
					    'tagMV1_REF_POLYGONLIST MV1_REF_POLYGONLIST ' +
					    'tagSOUND3D_REVERB_PARAM SOUND3D_REVERB_PARAM tagSTREAMDATASHREDTYPE2 STREAMDATASHREDTYPE2 tagSTREAMDATASHREDTYPE2W STREAMDATASHREDTYPE2W ' +
					    'tagSTREAMDATASHRED STREAMDATASHRED LPSTREAMDATASHRED tagSTREAMDATA STREAMDATA ' +
					    'tagCOLORPALETTEDATA COLORPALETTEDATA tagCOLORDATA COLORDATA LPCOLORDATA tagBASEIMAGE BASEIMAGE GRAPHIMAGE LPGRAPHIMAGE ' +
					    'tagLINEDATA LINEDATA LPLINEDATA tagPOINTDATA POINTDATA LPPOINTDATA tagIMAGEFORMATDESC IMAGEFORMATDESC ' +
					    'tagXINPUT_STATE XINPUT_STATE tagTOUCHINPUTPOINT TOUCHINPUTPOINT tagTOUCHINPUTDATA TOUCHINPUTDATA ' +
					    'tagIPDATA IPDATA LPIPDATA tagIPDATA_IPv6 IPDATA_IPv6 ' +
					    //DxLib(DxDirectX.h)
					    'D_HMONITOR D_UINT8 tagD_DSCAPS D_DSCAPS tagD_DSBUFFERDESC D_DSBUFFERDESC tagD_DSBPOSITIONNOTIFY ' +
						'D_DSBPOSITIONNOTIFY tagD_DSEFFECTDESC D_DSEFFECTDESC LPD_DSENUMCALLBACKA LPD_DSENUMCALLBACKW D_IDirectSound ' +
						'D_IDirectSound8 D_IDirectSoundBuffer D_IDirectSoundBuffer8 D_IDirectSoundNotify tagD_X3DAUDIO_VECTOR ' +
						'D_X3DAUDIO_VECTOR D_X3DAUDIO_HANDLE tagD_X3DAUDIO_CONE D_X3DAUDIO_CONE tagD_X3DAUDIO_DISTANCE_CURVE_POINT ' +
						'D_X3DAUDIO_DISTANCE_CURVE_POINT tagD_X3DAUDIO_DISTANCE_CURVE D_X3DAUDIO_DISTANCE_CURVE tagD_X3DAUDIO_EMITTER ' +
						'D_X3DAUDIO_EMITTER tagD_X3DAUDIO_LISTENER D_X3DAUDIO_LISTENER tagD_X3DAUDIO_DSP_SETTINGS ' +
						'D_X3DAUDIO_DSP_SETTINGS D_XAUDIO2FX_PRESET tagD_XAUDIO2FX_REVERB_PARAMETERS D_XAUDIO2FX_REVERB_PARAMETERS ' +
						'tagD_XAUDIO2FX_REVERB_PARAMETERS2_8 D_XAUDIO2FX_REVERB_PARAMETERS2_8 tagD_XAUDIO2FX_REVERB_I3DL2_PARAMETERS ' +
						'D_XAUDIO2FX_REVERB_I3DL2_PARAMETERS tagD_XAUDIO2_WINDOWS_PROCESSOR_SPECIFIER ' +
						'D_XAUDIO2_WINDOWS_PROCESSOR_SPECIFIER D_XAUDIO2_PROCESSOR D_XAUDIO2_DEVICE_ROLE D_XAUDIO2_FILTER_TYPE ' +
						'D_AUDIO_STREAM_CATEGORY tagD_WAVEFORMATEXTENSIBLE D_WAVEFORMATEXTENSIBLE tagD_XAUDIO2_VOICE_STATE ' +
						'D_XAUDIO2_VOICE_STATE tagD_XAUDIO2_EFFECT_DESCRIPTOR D_XAUDIO2_EFFECT_DESCRIPTOR tagD_XAUDIO2_DEVICE_DETAILS ' +
						'D_XAUDIO2_DEVICE_DETAILS tagD_XAUDIO2_VOICE_DETAILS D_XAUDIO2_VOICE_DETAILS tagD_XAUDIO2_VOICE_DETAILS2_8 ' +
						'D_XAUDIO2_VOICE_DETAILS2_8 tagD_XAUDIO2_SEND_DESCRIPTOR D_XAUDIO2_SEND_DESCRIPTOR ' +
						'tagD_XAUDIO2_SEND_DESCRIPTOR2_8 D_XAUDIO2_SEND_DESCRIPTOR2_8 tagD_XAUDIO2_VOICE_SENDS D_XAUDIO2_VOICE_SENDS ' +
						'tagD_XAUDIO2_VOICE_SENDS2_8 D_XAUDIO2_VOICE_SENDS2_8 tagD_XAUDIO2_PERFORMANCE_DATA D_XAUDIO2_PERFORMANCE_DATA ' +
						'tagD_XAUDIO2_DEBUG_CONFIGURATION D_XAUDIO2_DEBUG_CONFIGURATION tagD_XAUDIO2_EFFECT_CHAIN ' +
						'D_XAUDIO2_EFFECT_CHAIN tagD_XAUDIO2_BUFFER D_XAUDIO2_BUFFER tagD_XAUDIO2_FILTER_PARAMETERS ' +
						'D_XAUDIO2_FILTER_PARAMETERS tagD_XAUDIO2_BUFFER_WMA D_XAUDIO2_BUFFER_WMA D_IXAudio2VoiceCallback ' +
						'D_IXAudio2EngineCallback D_IXAudio2 D_IXAudio2_8 D_IXAudio2Voice D_IXAudio2_8Voice D_IXAudio2SubmixVoice ' +
						'D_IXAudio2_8SubmixVoice D_IXAudio2MasteringVoice D_IXAudio2_8MasteringVoice D_IXAudio2SourceVoice ' +
						'D_IXAudio2_8SourceVoice D_MUSIC_TIME D_REFERENCE_TIME D_EDataFlow D_ERole D_AUDCLNT_SHAREMODE ' +
						'D_IPropertyStore D_IMMDevice D_IMMNotificationClient D_IMMDeviceCollection D_IMMDeviceEnumerator ' +
						'D_IAudioRenderClient D_IAudioClient tagD_DMUS_SEGF_FLAGS D_DMUS_SEGF_FLAGS tagD_DMUS_PORTCAPS D_DMUS_PORTCAPS ' +
						'tagD_DMUS_VERSION D_DMUS_VERSION tagD_DMUS_OBJECTDESC D_DMUS_OBJECTDESC tagD_DMUS_AUDIOPARAMS ' +
						'D_DMUS_AUDIOPARAMS D_IDirectMusic D_IDirectMusic8 D_IDirectMusicSegmentState D_IDirectMusicSegment ' +
						'D_IDirectMusicSegment8 D_IDirectMusicLoader D_IDirectMusicLoader8 D_IDirectMusicAudioPath ' +
						'D_IDirectMusicPerformance D_IDirectMusicPerformance8 tagD_DDSCAPS2 D_DDSCAPS2 tagD_DDSCAPS D_DDSCAPS ' +
						'tagD_DDCAPS D_DDCAPS tagD_DDPIXELFORMAT D_DDPIXELFORMAT tagD_DDCOLORKEY D_DDCOLORKEY tagD_DDSURFACEDESC ' +
						'D_DDSURFACEDESC tagD_DDSURFACEDESC2 D_DDSURFACEDESC2 tagD_DDDEVICEIDENTIFIER2 D_DDDEVICEIDENTIFIER2 ' +
						'tagD_DDBLTFX D_DDBLTFX tagD_DDOVERLAYFX D_DDOVERLAYFX LPD_DDENUMSURFACESCALLBACK7 LPD_DDENUMSURFACESCALLBACK2 ' +
						'LPD_DDENUMSURFACESCALLBACK LPD_DDENUMMODESCALLBACK2 LPD_DDENUMCALLBACKEXA LPD_DDENUMCALLBACKEXW D_IDirectDraw ' +
						'D_IDirectDraw2 D_IDirectDraw4 D_IDirectDraw7 D_IDirectDrawSurface D_IDirectDrawSurface2 D_IDirectDrawSurface3 ' +
						'D_IDirectDrawSurface4 D_IDirectDrawSurface7 D_IDirectDrawClipper D_IDirectDrawPalette tagD_D3D_INCLUDE_TYPE ' +
						'D_D3D_INCLUDE_TYPE D_DXGI_USAGE tagD_DXGI_SWAP_CHAIN_FLAG D_DXGI_SWAP_CHAIN_FLAG tagD_DXGI_SWAP_EFFECT ' +
						'D_DXGI_SWAP_EFFECT tagD_DXGI_RESIDENCY D_DXGI_RESIDENCY tagD_DXGI_MODE_SCANLINE_ORDER ' +
						'D_DXGI_MODE_SCANLINE_ORDER tagD_DXGI_MODE_SCALING D_DXGI_MODE_SCALING tagD_DXGI_MODE_ROTATION ' +
						'D_DXGI_MODE_ROTATION tagD_DXGI_FORMAT D_DXGI_FORMAT tagD_D3D_DRIVER_TYPE D_D3D_DRIVER_TYPE ' +
						'tagD_D3D_FEATURE_LEVEL D_D3D_FEATURE_LEVEL tagD_D3D11_FORMAT_SUPPORT D_D3D11_FORMAT_SUPPORT ' +
						'tagD_D3D11_CPU_ACCESS_FLAG D_D3D11_CPU_ACCESS_FLAG tagD_D3D11_RESOURCE_DIMENSION D_D3D11_RESOURCE_DIMENSION ' +
						'tagD_D3D11_RESOURCE_MISC_FLAG D_D3D11_RESOURCE_MISC_FLAG tagD_D3D11_SRV_DIMENSION D_D3D11_SRV_DIMENSION ' +
						'tagD_D3D11_DSV_DIMENSION D_D3D11_DSV_DIMENSION tagD_D3D11_RTV_DIMENSION D_D3D11_RTV_DIMENSION ' +
						'tagD_D3D11_UAV_DIMENSION D_D3D11_UAV_DIMENSION tagD_D3D11_USAGE D_D3D11_USAGE tagD_D3D11_BIND_FLAG ' +
						'D_D3D11_BIND_FLAG tagD_D3D11_INPUT_CLASSIFICATION D_D3D11_INPUT_CLASSIFICATION ' +
						'tagD_D3D11_STANDARD_MULTISAMPLE_QUALITY_LEVELS D_D3D11_STANDARD_MULTISAMPLE_QUALITY_LEVELS ' +
						'tagD_D3D11_DEVICE_CONTEXT_TYPE D_D3D11_DEVICE_CONTEXT_TYPE tagD_D3D11_CREATE_DEVICE_FLAG ' +
						'D_D3D11_CREATE_DEVICE_FLAG tagD_D3D11_BLEND D_D3D11_BLEND tagD_D3D11_BLEND_OP D_D3D11_BLEND_OP ' +
						'tagD_D3D11_COMPARISON_FUNC D_D3D11_COMPARISON_FUNC tagD_D3D11_DEPTH_WRITE_MASK D_D3D11_DEPTH_WRITE_MASK ' +
						'D_D3D11_STENCIL_OP D_D3D11_STENCIL_OP tagD_D3D11_FILL_MODE D_D3D11_FILL_MODE tagD_D3D11_CULL_MODE ' +
						'D_D3D11_CULL_MODE tagD_D3D11_PRIMITIVE_TOPOLOGY D_D3D11_PRIMITIVE_TOPOLOGY tagD_D3D11_FILTER D_D3D11_FILTER ' +
						'tagD_D3D11_FILTER_TYPE D_D3D11_FILTER_TYPE tagD_D3D11_TEXTURE_ADDRESS_MODE D_D3D11_TEXTURE_ADDRESS_MODE ' +
						'tagD_D3D11_ASYNC_GETDATA_FLAG D_D3D11_ASYNC_GETDATA_FLAG tagD_D3D11_QUERY D_D3D11_QUERY ' +
						'tagD_D3D11_QUERY_MISC_FLAG D_D3D11_QUERY_MISC_FLAG tagD_D3D11_CLEAR_FLAG D_D3D11_CLEAR_FLAG ' +
						'tagD_D3D11_COUNTER D_D3D11_COUNTER tagD_D3D11_COUNTER_TYPE D_D3D11_COUNTER_TYPE tagD_D3D11_MAP D_D3D11_MAP ' +
						'tagD_D3D11_FEATURE D_D3D11_FEATURE tagD_DXGI_RATIONAL D_DXGI_RATIONAL tagD_DXGI_ADAPTER_DESC ' +
						'D_DXGI_ADAPTER_DESC tagD_DXGI_ADAPTER_DESC1 D_DXGI_ADAPTER_DESC1 tagD_D3D11_TEX1D_DSV D_D3D11_TEX1D_DSV ' +
						'tagD_D3D11_TEX1D_ARRAY_DSV D_D3D11_TEX1D_ARRAY_DSV tagD_D3D11_TEX2D_DSV D_D3D11_TEX2D_DSV ' +
						'tagD_D3D11_TEX2D_ARRAY_DSV D_D3D11_TEX2D_ARRAY_DSV tagD_D3D11_TEX2DMS_DSV D_D3D11_TEX2DMS_DSV ' +
						'tagD_D3D11_TEX2DMS_ARRAY_DSV D_D3D11_TEX2DMS_ARRAY_DSV tagD_D3D11_DSV_FLAG D_D3D11_DSV_FLAG ' +
						'tagD_D3D11_DEPTH_STENCIL_VIEW_DESC D_D3D11_DEPTH_STENCIL_VIEW_DESC tagD_DXGI_OUTPUT_DESC D_DXGI_OUTPUT_DESC ' +
						'tagD_DXGI_RGB D_DXGI_RGB tagD_DXGI_GAMMA_CONTROL D_DXGI_GAMMA_CONTROL tagD_DXGI_GAMMA_CONTROL_CAPABILITIES ' +
						'D_DXGI_GAMMA_CONTROL_CAPABILITIES tagD_DXGI_FRAME_STATISTICS D_DXGI_FRAME_STATISTICS tagD_DXGI_MAPPED_RECT ' +
						'D_DXGI_MAPPED_RECT tagD_DXGI_SAMPLE_DESC D_DXGI_SAMPLE_DESC tagD_DXGI_MODE_DESC D_DXGI_MODE_DESC ' +
						'tagD_DXGI_SWAP_CHAIN_DESC D_DXGI_SWAP_CHAIN_DESC tagD_DXGI_SURFACE_DESC D_DXGI_SURFACE_DESC ' +
						'tagD_DXGI_SHARED_RESOURCE D_DXGI_SHARED_RESOURCE tagD_D3D11_TEXTURE1D_DESC D_D3D11_TEXTURE1D_DESC ' +
						'tagD_D3D11_TEXTURE2D_DESC D_D3D11_TEXTURE2D_DESC tagD_D3D11_TEXTURE3D_DESC D_D3D11_TEXTURE3D_DESC ' +
						'tagD_D3D11_BUFFER_SRV D_D3D11_BUFFER_SRV tagD_D3D11_BUFFEREX_SRV_FLAG D_D3D11_BUFFEREX_SRV_FLAG ' +
						'tagD_D3D11_BUFFEREX_SRV D_D3D11_BUFFEREX_SRV tagD_D3D11_TEX1D_SRV D_D3D11_TEX1D_SRV ' +
						'tagD_D3D11_TEX1D_ARRAY_SRV D_D3D11_TEX1D_ARRAY_SRV tagD_D3D11_TEX2D_SRV D_D3D11_TEX2D_SRV ' +
						'tagD_D3D11_TEX2D_ARRAY_SRV D_D3D11_TEX2D_ARRAY_SRV tagD_D3D11_TEX3D_SRV D_D3D11_TEX3D_SRV ' +
						'tagD_D3D11_TEXCUBE_SRV D_D3D11_TEXCUBE_SRV tagD_D3D11_TEXCUBE_ARRAY_SRV D_D3D11_TEXCUBE_ARRAY_SRV ' +
						'tagD_D3D11_TEX2DMS_SRV D_D3D11_TEX2DMS_SRV tagD_D3D11_TEX2DMS_ARRAY_SRV D_D3D11_TEX2DMS_ARRAY_SRV ' +
						'tagD_D3D11_SHADER_RESOURCE_VIEW_DESC D_D3D11_SHADER_RESOURCE_VIEW_DESC tagD_D3D11_BUFFER_UAV_FLAG ' +
						'D_D3D11_BUFFER_UAV_FLAG tagD_D3D11_BUFFER_UAV D_D3D11_BUFFER_UAV tagD_D3D11_TEX1D_UAV D_D3D11_TEX1D_UAV ' +
						'tagD_D3D11_TEX1D_ARRAY_UAV D_D3D11_TEX1D_ARRAY_UAV tagD_D3D11_TEX2D_UAV D_D3D11_TEX2D_UAV ' +
						'tagD_D3D11_TEX2D_ARRAY_UAV D_D3D11_TEX2D_ARRAY_UAV tagD_D3D11_TEX3D_UAV D_D3D11_TEX3D_UAV ' +
						'tagD_D3D11_UNORDERED_ACCESS_VIEW_DESC D_D3D11_UNORDERED_ACCESS_VIEW_DESC tagD_D3D11_BUFFER_RTV ' +
						'D_D3D11_BUFFER_RTV tagD_D3D11_TEX1D_RTV D_D3D11_TEX1D_RTV tagD_D3D11_TEX1D_ARRAY_RTV D_D3D11_TEX1D_ARRAY_RTV ' +
						'tagD_D3D11_TEX2D_RTV D_D3D11_TEX2D_RTV tagD_D3D11_TEX2DMS_RTV D_D3D11_TEX2DMS_RTV tagD_D3D11_TEX2D_ARRAY_RTV ' +
						'D_D3D11_TEX2D_ARRAY_RTV tagD_D3D11_TEX2DMS_ARRAY_RTV D_D3D11_TEX2DMS_ARRAY_RTV tagD_D3D11_TEX3D_RTV ' +
						'D_D3D11_TEX3D_RTV tagD_D3D11_RENDER_TARGET_VIEW_DESC D_D3D11_RENDER_TARGET_VIEW_DESC ' +
						'tagD_D3D11_SUBRESOURCE_DATA D_D3D11_SUBRESOURCE_DATA tagD_D3D11_BUFFER_DESC D_D3D11_BUFFER_DESC ' +
						'D_D3D11_INPUT_ELEMENT_DESC D_D3D11_INPUT_ELEMENT_DESC D_D3D11_CLASS_INSTANCE_DESC D_D3D11_CLASS_INSTANCE_DESC ' +
						'tagD_D3D11_SO_DECLARATION_ENTRY D_D3D11_SO_DECLARATION_ENTRY tagD_D3D11_COLOR_WRITE_ENABLE ' +
						'D_D3D11_COLOR_WRITE_ENABLE D_D3D11_RENDER_TARGET_BLEND_DESC D_D3D11_RENDER_TARGET_BLEND_DESC ' +
						'D_D3D11_BLEND_DESC D_D3D11_BLEND_DESC tagD_D3D11_DEPTH_STENCILOP_DESC D_D3D11_DEPTH_STENCILOP_DESC ' +
						'tagD_D3D11_DEPTH_STENCIL_DESC D_D3D11_DEPTH_STENCIL_DESC tagD_D3D11_RASTERIZER_DESC D_D3D11_RASTERIZER_DESC ' +
						'tagD_D3D11_SAMPLER_DESC D_D3D11_SAMPLER_DESC tagD_D3D11_QUERY_DESC D_D3D11_QUERY_DESC tagD_D3D11_COUNTER_DESC ' +
						'D_D3D11_COUNTER_DESC tagD_D3D11_MAPPED_SUBRESOURCE D_D3D11_MAPPED_SUBRESOURCE tagD_D3D11_VIEWPORT ' +
						'D_D3D11_VIEWPORT D_D3D11_RECT tagD_D3D11_BOX D_D3D11_BOX D_D3D11_COUNTER_INFO D_D3D11_COUNTER_INFO D_ID3DBlob ' +
						'D_ID3DInclude D_IDXGIObject D_IDXGIDevice D_IDXGIDevice1 D_IDXGIDeviceSubObject D_IDXGISurface D_IDXGIOutput ' +
						'D_IDXGIAdapter D_IDXGIAdapter1 D_IDXGISwapChain D_IDXGIFactory D_IDXGIFactory1 D_ID3D11DeviceChild ' +
						'D_ID3D11Resource D_ID3D11Buffer D_ID3D11Texture1D D_ID3D11Texture2D D_ID3D11Texture3D D_ID3D11View ' +
						'D_ID3D11InputLayout D_ID3D11ShaderResourceView D_ID3D11UnorderedAccessView D_ID3D11RenderTargetView ' +
						'D_ID3D11DepthStencilView D_ID3D11ClassInstance D_ID3D11ClassLinkage D_ID3D11VertexShader ' +
						'D_ID3D11GeometryShader D_ID3D11PixelShader D_ID3D11HullShader D_ID3D11DomainShader D_ID3D11ComputeShader ' +
						'D_ID3D11BlendState D_ID3D11DepthStencilState D_ID3D11RasterizerState D_ID3D11SamplerState ' +
						'D_ID3D11Asynchronous D_ID3D11Query D_ID3D11Predicate D_ID3D11Counter D_ID3D11CommandList ' +
						'D_ID3D11DeviceContext D_ID3D11Device LPD_CREATEDXGIFACTORY LPD_CREATEDXGIFACTORY1 LPD_D3D11CREATEDEVICE ' +
						'LPD_D3D11CREATEDEVICEANDSWAPCHAIN tagD_D3DVERTEXBLENDFLAGS D_D3DVERTEXBLENDFLAGS tagD_D3DCULL D_D3DCULL ' +
						'tagD_D3DZBUFFERTYPE D_D3DZBUFFERTYPE tagD_D3DBLEND D_D3DBLEND tagD_D3DMATERIALCOLORSOURCE ' +
						'D_D3DMATERIALCOLORSOURCE tagD_D3DTEXTUREOP D_D3DTEXTUREOP tagD_D3DSHADEMODE D_D3DSHADEMODE tagD_D3DFOGMODE ' +
						'D_D3DFOGMODE tagD_D3DTEXTUREMAGFILTER D_D3DTEXTUREMAGFILTER tagD_D3DTEXTUREMINFILTER D_D3DTEXTUREMINFILTER ' +
						'tagD_D3DTEXTUREMIPFILTER D_D3DTEXTUREMIPFILTER tagD_D3DTEXTUREADDRESS D_D3DTEXTUREADDRESS ' +
						'tagD_D3DPRIMITIVETYPE D_D3DPRIMITIVETYPE tagD_D3DCMPFUNC D_D3DCMPFUNC tagD_D3DANTIALIASMODE ' +
						'D_D3DANTIALIASMODE tagD_D3DRENDERSTATETYPE D_D3DRENDERSTATETYPE tagD_D3DSAMPLERSTATETYPE ' +
						'D_D3DSAMPLERSTATETYPE tagD_D3DSTATEBLOCKTYPE D_D3DSTATEBLOCKTYPE tagD_D3DTEXTURESTAGESTATETYPE ' +
						'D_D3DTEXTURESTAGESTATETYPE tagD_D3DTEXTURETRANSFORMFLAGS D_D3DTEXTURETRANSFORMFLAGS ' +
						'tagD_D3DTRANSFORMSTATETYPE D_D3DTRANSFORMSTATETYPE tagD_D3DLIGHTTYPE D_D3DLIGHTTYPE D_D3DFORMAT D_D3DFORMAT ' +
						'tagD_D3DQUERYTYPE D_D3DQUERYTYPE tagD_D3DTEXTUREFILTERTYPE D_D3DTEXTUREFILTERTYPE tagD_D3DBASISTYPE ' +
						'D_D3DBASISTYPE tagD_D3DDEGREETYPE D_D3DDEGREETYPE tagD_D3DBLENDOP D_D3DBLENDOP tagD_D3DCUBEMAP_FACES ' +
						'D_D3DCUBEMAP_FACES tagD_D3DDEVTYPE D_D3DDEVTYPE tagD_D3DPOOL D_D3DPOOL tagD_D39DBACKBUFFER_TYPE ' +
						'D_D3DBACKBUFFER_TYPE tagD_D3DSWAPEFFECT D_D3DSWAPEFFECT tagD_D3DMULTISAMPLE_TYPE D_D3DMULTISAMPLE_TYPE ' +
						'D_D3DRESOURCETYPE D_D3DRESOURCETYPE D_D3DDECLUSAGE D_D3DDECLUSAGE D_D3DDECLMETHOD D_D3DDECLMETHOD ' +
						'tagD_D3DDECLTYPE D_D3DDECLTYPE tagD_D3DXREGISTER_SET D_D3DXREGISTER_SET tagD_D3DXPARAMETER_CLASS ' +
						'D_D3DXPARAMETER_CLASS tagD_D3DXPARAMETER_TYPE D_D3DXPARAMETER_TYPE D_D3DSCANLINEORDERING ' +
						'D_D3DSCANLINEORDERING D_D3DCOMPOSERECTSOP D_D3DCOMPOSERECTSOP D_D3DDISPLAYROTATION D_D3DDISPLAYROTATION ' +
						'D_D3DFILLMODE D_D3DFILLMODE D_D3DVALUE D_D3DCOLOR tagD_D3DVIEWPORT7 D_D3DVIEWPORT7 tagD_D3DPRIMCAPS ' +
						'D_D3DPRIMCAPS tagD_D3DDEVICEDESC7 D_D3DDEVICEDESC7 tagD_D3DRECT D_D3DRECT tagD_D3DMATRIX D_D3DMATRIX ' +
						'tagD_D3DCOLORVALUE D_D3DCOLORVALUE tagD_D3DVECTOR D_D3DVECTOR tagD_D3DMATERIAL7 D_D3DMATERIAL7 tagD_D3DLIGHT7 ' +
						'D_D3DLIGHT7 tagD_D3DVERTEXBUFFERDESC D_D3DVERTEXBUFFERDESC D_D3DVSHADERCAPS2_0 D_D3DVSHADERCAPS2_0 ' +
						'tagD_D3DPSHADERCAPS2_0 D_D3DPSHADERCAPS2_0 tagD_D3DDISPLAYMODE D_D3DDISPLAYMODE tagD_D3DPRESENT_PARAMETERS ' +
						'D_D3DPRESENT_PARAMETERS tagD_D3DDEVICE_CREATION_PARAMETERS D_D3DDEVICE_CREATION_PARAMETERS ' +
						'tagD_D3DRASTER_STATUS D_D3DRASTER_STATUS tagD_D3DGAMMARAMP D_D3DGAMMARAMP tagD_D3DVIEWPORT9 D_D3DVIEWPORT9 ' +
						'tagD_D3DCLIPSTATUS9 D_D3DCLIPSTATUS9 tagD_D3DMATERIAL9 D_D3DMATERIAL9 tagD_D3DLIGHT9 D_D3DLIGHT9 ' +
						'tagD_D3DVERTEXELEMENT9 D_D3DVERTEXELEMENT9 tagD_D3DRECTPATCH_INFO D_D3DRECTPATCH_INFO tagD_D3DTRIPATCH_INFO ' +
						'D_D3DTRIPATCH_INFO tagD_D3DSURFACE_DESC D_D3DSURFACE_DESC tagD_D3DLOCKED_BOX D_D3DLOCKED_BOX ' +
						'tagD_D3DVOLUME_DESC D_D3DVOLUME_DESC tagD_D3DBOX D_D3DBOX tagD_D3DLOCKED_RECT D_D3DLOCKED_RECT ' +
						'tagD_D3DVERTEXBUFFER_DESC D_D3DVERTEXBUFFER_DESC tagD_D3DINDEXBUFFER_DESC D_D3DINDEXBUFFER_DESC tagD_D3DCAPS9 ' +
						'D_D3DCAPS9 tagD_D3DADAPTER_IDENTIFIER9 D_D3DADAPTER_IDENTIFIER9 tagD_D3DXMACRO D_D3DXMACRO ' +
						'tagD_D3DXCONSTANTTABLE_DESC D_D3DXCONSTANTTABLE_DESC tagD_D3DXCONSTANT_DESC D_D3DXCONSTANT_DESC ' +
						'tagD_D3DXSHADER_CONSTANTINFO D_D3DXSHADER_CONSTANTINFO tagD_D3DDISPLAYMODEEX D_D3DDISPLAYMODEEX ' +
						'tagD_D3DDISPLAYMODEFILTER D_D3DDISPLAYMODEFILTER LPD_D3DENUMDEVICESCALLBACK7 LPD_D3DENUMPIXELFORMATSCALLBACK ' +
						'LPD_D3DENUMPIXELFORMATSCALLBACK D_IDirect3DResource9 D_IDirect3DSurface9 D_IDirect3DBaseTexture9 ' +
						'D_IDirect3DTexture9 D_IDirect3DVolume9 D_IDirect3DVolumeTexture9 D_IDirect3DCubeTexture9 ' +
						'D_IDirect3DVertexBuffer9 D_IDirect3DIndexBuffer9 D_IDirect3DSwapChain9 D_IDirect3DQuery9 ' +
						'D_IDirect3DStateBlock9 D_IDirect3DVertexDeclaration9 D_IDirect3DVertexShader9 D_IDirect3DPixelShader9 ' +
						'D_IDirect3DDevice9 D_IDirect3DDevice9Ex D_IDirect3D9 D_IDirect3D9Ex D_IDirect3D7 D_IDirect3DDevice7 ' +
						'D_IDirect3DVertexBuffer7 D_ID3DXBuffer D_ID3DXConstantTable tagD_XINPUT_GAMEPAD D_XINPUT_GAMEPAD ' +
						'tagD_XINPUT_STATE D_XINPUT_STATE tagD_XINPUT_VIBRATION D_XINPUT_VIBRATION tagD_DIDEVICEOBJECTINSTANCEA ' +
						'D_DIDEVICEOBJECTINSTANCEA tagD_DIDEVICEOBJECTINSTANCEW D_DIDEVICEOBJECTINSTANCEW tagD_DIDEVICEINSTANCEA ' +
						'D_DIDEVICEINSTANCEA tagD_DIDEVICEINSTANCEW D_DIDEVICEINSTANCEW tagD_DIPROPHEADER D_DIPROPHEADER ' +
						'tagD_DIPROPRANGE D_DIPROPRANGE tagD_DIPROPDWORD D_DIPROPDWORD tagD_DIDEVICEOBJECTDATA_DX8 ' +
						'D_DIDEVICEOBJECTDATA_DX8 tagD_DIDEVICEOBJECTDATA_DX7 D_DIDEVICEOBJECTDATA_DX7 tagD_DIJOYSTATE D_DIJOYSTATE ' +
						'tagD_DIJOYSTATE2 D_DIJOYSTATE2 tagD_DIMOUSESTATE D_DIMOUSESTATE tagD_DIMOUSESTATE2 D_DIMOUSESTATE2 ' +
						'tagD_DIOBJECTDATAFORMAT D_DIOBJECTDATAFORMAT tagD_DIDATAFORMAT D_DIDATAFORMAT tagD_DIDEVCAPS D_DIDEVCAPS ' +
						'tagD_DIPERIODIC D_DIPERIODIC tagD_DIENVELOPE D_DIENVELOPE tagD_DIEFFECT D_DIEFFECT tagD_DIEFFECTINFOA ' +
						'D_DIEFFECTINFOA tagD_DIEFFECTINFOW D_DIEFFECTINFOW tagD_DICONSTANTFORCE D_DICONSTANTFORCE ' +
						'LPD_DIENUMDEVICESCALLBACKA LPD_DIENUMDEVICESCALLBACKW LPD_DIENUMEFFECTSCALLBACKA LPD_DIENUMEFFECTSCALLBACKW ' +
						'D_IDirectInputDevice D_IDirectInputDevice2 D_IDirectInputDevice7 D_IDirectInputDevice8 D_IDirectInput8 ' +
						'D_IDirectInput D_IDirectInput2 D_IDirectInput7 D_IDirectInputEffect ' +
						//DxLib(DxSoundWin.h)
						'SOUNDBUFFER_CALLBACK SOUNDBUFFER_PF SOUNDSYSTEMDATA_PF MIDIHANDLEDATA_PF MIDISYSTEMDATA_PF ' +
					    //DxLib(DxHandle.h)
					    'HANDLELIST HANDLEINFO HANDLEMANAGE ' +
					    //DxLib(DxSound.h)
					    'LOADSOUND_GPARAM SOUNDBUFFERLOCKDATA WAVEDATA _3DSOUNDINFO SOUNDBUFFER STREAMFILEDATA STREAMPLAYDATA NORMALPLAYDATA ' +
					    'SOUND SOFTSOUND_WAVE SOFTSOUND_PLAYER SOFTSOUND SOUNDSYSTEMDATA MIDIHANDLEDATA MIDISYSTEMDATA ' +
					    //OpenCV 1.0
						'IplImage ' +
						//for Template
					    'T_ T Args TYPE reference pointer limit iterator Value type Handler Signature First Last Tag Cond next Cont ' +
					    //Frequently used name
					    'counter_iterator nth_loop rand_type Then Else IF my_uniform_distribution PrimitiveType status_t color_e_t myuint8_t ' +
					    'rgb_t bignum_t BIGNUM uint shared_const_buffer MutableBufferSequence';

		var preprocessor_word = 'alloc_text auto_inline bss_seg check_stack code_seg comment component conform const_seg data_seg deprecated detect_mismatch ' +
						'fenv_access float_control fp_contract function hdrstop include_alias init_seg inline_depth inline_recursion intrinsic ' +
						'loop make_public managed message omp once optimize pack pointers_to_members pop_macro push_macro region endregion ' +
						'runtime_checks section setlocale strict_gs_check unmanaged vtordisp warning defined ';

		this.regexList = [
			{ regex: /#[ ]*(?:define|error|import|undef|elif|include|using|ifdef|line|ifndef|if|pragma|else|endif)/g,　css: 'preprocessor' },
			{ regex: SyntaxHighlighter.regexLib.singleLineCComments,	css: 'comments' },			// one line comments
			{ regex: SyntaxHighlighter.regexLib.multiLineCComments,		css: 'comments' },			// multiline comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },			// strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },			// strings
			{ regex: /!(?:defined)/g,　css: 'preprocessor' },
			{ regex: new RegExp(this.getKeywords(preprocessor_word), 'gm'),	css: 'preprocessor' },
			{ regex: new RegExp(this.getKeywords(typedefined), 'gm'),	css: 'color1 bold' },
			{ regex: new RegExp(this.getKeywords(macro), 'gm'),			css: 'color2 bold' },
			{ regex: new RegExp(this.getKeywords(reserved), 'gm'),		css: 'keyword bold' }
			];
	}

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['cpp_dxlib', 'c_dxlib'];

	SyntaxHighlighter.brushes.Cpp = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
