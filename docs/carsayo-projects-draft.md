# 카사요 프로젝트 정리 (포트폴리오 추가용)

> 작성 목적: projects.ts에 추가할 내용 정리 회사: carsayo (카사요) 재직 기간: 2024-12 ~ 현재

---

## 1. 카사요 홈페이지

- **id**: carsayo-homepage
- **site**: https://carsayo.net/
- **periodStart**: 2025-01 (확인 필요)
- **filter**: team, FE
- **skillItem**: Next.js, TypeScript, TailwindCSS, Zustand, React Query, Framer Motion, Zod

### description

신차 장기렌트/리스, 내 차 팔기, 사고수리, 다이렉트 보험 등 자동차 통합 서비스를 소개하는 카사요 메인
홈페이지입니다.

### feature

- 히어로 비디오 배너 및 빠른 상담 요청 모달
- 즉시출고 차량 카드 캐러셀 (Swiper, 반응형 디바이스별 노출 수 조정)
- 장기렌트/리스 브랜드별 차량 필터링 및 페이지네이션
- 복지몰 전용 주문 페이지 (차종 선택, 견적 산출, 파일 업로드, Zod 검증)
- 뉴스/인증 섹션 듀얼 캐러셀 (자동재생 + 일시정지 토글)
- Google Tag Manager 연동 및 Schema.org 구조화 데이터

### contribution

- **메인 페이지 디자인 리뉴얼 및 신규 기능 구축**
  - 기존 메인 페이지 전면 디자인 리뉴얼 작업 담당
  - 즉시출고 차량 섹션 신규 구축 (카드 캐러셀, 계약 기간/보증금 옵션별 동적 가격 표시)
  - 빠른 상담 요청 시스템 신규 구축 (React Portal 모달, 즉시출고/장기렌트/리스 유형별 분기)

- **반응형 디자인 시스템 구축**
  - 5단계 커스텀 브레이크포인트(micro/mobile/tablet/wide-tablet/pc) 설계 및 Tailwind 확장
  - useDisplayMode 훅으로 뷰포트 변화에 따른 동적 UI 제어

- **빠른 상담 요청 모달 구현**
  - React Portal 기반 모달, 전화번호 포맷팅 및 실시간 폼 검증
  - API 연동으로 즉시출고/장기렌트/리스 유형별 빠른 견적 요청

- **차량 카드 컴포넌트 및 인터랙션**
  - 계약 기간(12~84개월), 보증금 옵션 선택에 따른 동적 가격 표시
  - 호버 애니메이션, 지연 로딩 이미지, 반응형 레이아웃

- **복지몰 전용 주문 페이지 개발**
  - 렌트/리스 탭 전환, 차종 선택 모달, 지역 선택 드로어
  - Zod 스키마 검증, 파일 업로드, 약관 아코디언, 견적 산출 폼

- **SEO 및 메타데이터 최적화**
  - OpenGraph, Twitter Card, Schema.org Organization JSON-LD 구조화 데이터
  - 미들웨어를 통한 UTM 리다이렉트 및 IP 포워딩 처리

---

## 2. 카사요 앱

- **id**: carsayo-app
- **site**: https://app.carsayo.net/main
- **android**: https://play.google.com/store/apps/details?id=com.ksapp.carsayo&hl=ko
- **ios**:
  https://apps.apple.com/kr/app/%EC%B9%B4%EC%82%AC%EC%9A%94-%EC%8B%A0%EC%B0%A8-%EC%9E%A5%EA%B8%B0%EB%A0%8C%ED%8A%B8-%EB%A6%AC%EC%8A%A4-%EB%82%B4%EC%B0%A8%ED%8C%94%EA%B8%B0-%EC%82%AC%EA%B3%A0%EC%88%98%EB%A6%AC/id1546852990
- **periodStart**: 2024-12 (확인 필요)
- **filter**: team, feature, FE
- **skillItem**: React, TypeScript, Vite, TailwindCSS, MUI, Zustand, React Query, Socket.io, Toss
  Payments, Zod

### description

신차 장기렌트/리스 주문, 내 차 팔기, 사고수리 접수 등 자동차 관련 서비스를 통합 제공하는 하이브리드
모바일 앱입니다.

### feature

- 신차 장기렌트/리스 멀티스텝 주문 위저드 (브랜드→모델→트림→색상→옵션→결제)
- 내 차 팔기 위저드 (번호판 조회→차량 정보→상태→사고이력→사진 업로드)
- 사고수리 접수 및 정비소 검색 (카카오맵 연동, 거리 계산)
- Socket.io 기반 실시간 채팅 (파일 첨부, 차단, 알림 설정)
- Toss Payments 결제 연동 (카드, 가상계좌, 환불 처리)
- FCM 푸시 알림 (네이티브 브릿지 연동)
- PWA + Service Worker 오프라인 캐싱 지원

### contribution

- **내 차 팔기 전체 프로세스 리뉴얼 (FE 100% 단독 담당)**
  - 기존 프로세스에서 신규 프로세스로 사용자 측 내 차 팔기 전체 플로우 전면 리뉴얼
  - 위저드 단계 재설계(번호판 조회→차량 정보→상태→사고이력→사진 업로드) 및 UI/UX 재구성
  - 리뉴얼에 맞춰 B2B 중고차 딜러 웹앱과 연동되는 전체 프론트엔드 개발 단독 수행

- **앱 전반 FE 이슈 및 버그 수정 주도**
  - 신차 장기렌트/리스, 사고수리, 결제, 채팅 등 전 영역에 걸친 FE 버그 및 이슈 수정 도맡아 담당
  - 신규 기능 개발과 병행하여 운영 품질 유지

- **멀티스텝 폼 위저드 구현**
  - React Hook Form + Zod로 각 단계별 스키마 검증
  - Framer Motion 탭 전환 애니메이션, 진행 상태 인디케이터
  - 외부 차량 DB(Coocon API) 연동으로 번호판 기반 차량 정보 자동 조회

- **실시간 채팅 시스템 구축**
  - Socket.io 클라이언트로 메시지 송수신, 파일 첨부(S3 Presigned URL)
  - 채팅방 관리(생성/퇴장/차단), 온라인 상태 추적, 알림 설정
  - React Query 캐시와 소켓 이벤트 연동으로 실시간 UI 갱신

- **하이브리드 네이티브 브릿지 개발**
  - Android WebView(`window.android`) / iOS WKWebView(`window.webkit.messageHandlers`) 브릿지
    인터페이스 구현
  - 네이티브 이미지 피커 연동 (Android: localhost URL, iOS: Base64 청크 전송)
  - 위치 서비스, FCM 토큰 등록, 백 버튼 핸들링, 딥링크 네비게이션

- **결제 시스템 연동**
  - Toss Payments SDK 위젯 통합, 결제 요청/성공/실패 플로우
  - 주문 코드 생성, 환불 처리(가상계좌 포함), 결제 상태 관리

- **이미지 처리 파이프라인**
  - CropperJS 기반 이미지 크롭, browser-image-compression으로 클라이언트 사이드 압축
  - S3 Presigned URL 업로드, 파일 크기 검증(20MB), 진행 상태 토스트

- **iOS/Android 앱 패키징 및 배포**
  - 네이티브 앱 WebView 래퍼 패키징, 앱 라이프사이클(onResume) 관리
  - PWA manifest 및 Workbox Service Worker 캐싱 전략 설정

---

## 3. 카사요 중고차 딜러

- **id**: carsayo-auction
- **site**: https://auction.carsayo.net/login
- **android**:
  https://apps.apple.com/vn/app/%EC%B9%B4%EC%82%AC%EC%9A%94-%EC%A4%91%EA%B3%A0%EC%B0%A8-%EB%94%9C%EB%9F%AC%EC%9A%A9-%EC%98%A8%EB%9D%BC%EC%9D%B8-%EC%A4%91%EA%B3%A0%EC%B0%A8-%EB%A7%A4%EC%9E%85/id6749133052
- **ios**:
  https://apps.apple.com/vn/app/%EC%B9%B4%EC%82%AC%EC%9A%94-%EC%A4%91%EA%B3%A0%EC%B0%A8-%EB%94%9C%EB%9F%AC%EC%9A%A9-%EC%98%A8%EB%9D%BC%EC%9D%B8-%EC%A4%91%EA%B3%A0%EC%B0%A8-%EB%A7%A4%EC%9E%85/id6749133052
- **periodStart**: 2025-03 (확인 필요)
- **filter**: team, feature, FE
- **skillItem**: Next.js, TypeScript, TailwindCSS, MUI, Zustand, React Query, Socket.io, Toss
  Payments, Recharts, Zod

### description

카사요앱 내 차 팔기 프로세스 리뉴얼과 함께 신규로 개발된 B2B 온라인 경매 플랫폼으로, 중고차 딜러가 매물에 입찰하고 거래를 관리하는 웹앱입니다. PC와 모바일 화면을 아예 별도 디자인으로 설계하여 디바이스별 워크플로우에 최적화된 UX를 제공합니다.

### feature

- 경매 매물 리스트 및 무한 스크롤 페이지네이션
- 실시간 입찰 시스템 (잔여 시간 표시, 입찰가 입력, 허위입찰 페널티)
- 거래 관리 플로우 (낙찰→검수→탁송→완료→정산)
- Socket.io 기반 실시간 채팅
- 딜러 마이페이지 (입찰 이력, 낙찰/유찰 통계, 경고 상태 관리)
- Toss Payments 페널티 결제 연동
- 시세 조회 페이지 (브랜드별 매입가 참고 차트)

### contribution

- **신규 딜러 웹앱 프론트엔드 구축**
  - 카사요앱 내 차 팔기 리뉴얼과 연계하여 B2B 중고차 딜러용 웹앱을 신규 개발
  - PC / 모바일 완전 분리 설계 (디자인·정보 구조·인터랙션이 디바이스별로 상이)
  - 미들웨어 기반 디바이스 감지로 /m 경로 자동 리다이렉트 및 PC/모바일 전용 레이아웃·네비바·탭바 각각 구현

- **경매/입찰 UI 구현**
  - useInfiniteQuery 기반 무한 스크롤 매물 리스트 (100건 단위 페이지네이션)
  - 매물 카드 컴포넌트 (북마크, 방식 태그, 차량 이미지 캐러셀)
  - 입찰가 입력 모달 (수수료 안내, 허위입찰 경고 정책, 페널티 결제 플로우)

- **거래 상태 관리 시스템**
  - 거래 단계별 카드 컴포넌트 (매입 승인, 검수, 탁송, 완료, 정산)
  - 단계별 문서 업로드 및 영수증 생성
  - Zustand persist로 필터/탭 상태 세션 유지

- **실시간 채팅 및 알림**
  - Socket.io 기반 딜러-플랫폼 간 실시간 메시지
  - 채팅방 관리, 온라인 사용자 추적, 알림 토글

- **반응형 PC/모바일 분기**
  - 미들웨어 기반 디바이스 감지로 /m 경로 자동 리다이렉트
  - PC/모바일 별도 레이아웃 및 네비바/탭바 컴포넌트
  - 동일 기능이라도 PC는 대시보드형 멀티컬럼, 모바일은 시퀀셜 플로우 중심으로 재설계

- **Zod 기반 폼 검증 체계**
  - 회원가입, 방문 예약, 탁송, 영수증 등 복잡한 폼 스키마
  - React Hook Form + Zod 연동, 다음 우편번호 검색 통합

---

## 4. 인슈어런스 홈페이지 + 복지몰

- **id**: carsayo-insurance-homepage
- **site**: https://carsayo.insure/
- **periodStart**: 2025-01 (확인 필요)
- **filter**: team, feature, FE
- **skillItem**: Next.js, TypeScript, TailwindCSS, MUI, React Query, Zustand, React Hook Form, Zod,
  Notion API

### description

자동차 다이렉트 보험 비교 및 가입 서비스와 기업 복지몰(현대이지웰, 이제너두, 비즈마켓) 연동 상담
플랫폼으로, 입사 후 신규로 구축된 프로젝트입니다. 프론트엔드 전체를 단독으로 담당하여 기획 반영부터
디자인 시스템, 복지몰 파트너별 연동까지 구현했습니다.

### feature

- 개인/법인 보험 상담 신청 폼 (전화번호/사업자번호 포맷팅, 약관 동의)
- 보험료 비교 결과 페이지 (주민번호 앞자리 인증 후 보험사별 견적 비교)
- SMS 기반 추가 정보 수집 폼 (보안 키패드, 주민번호 RSA 암호화)
- 복지몰 파트너별 OAuth2 토큰 플로우 및 상담 등록 서버 액션
- 동적 상품 페이지 (복지몰별 [type] 라우팅)
- Notion CMS 연동 FAQ 및 약관 콘텐츠
- ISR(Incremental Static Regeneration) 적용 (300초 revalidation)

### contribution

- **신규 프로젝트 프론트엔드 100% 단독 담당**
  - 카사요 인슈어런스 홈페이지 및 복지몰 전체 프론트엔드를 기획 단계부터 단독 구현
  - 디자인 시스템, 공통 컴포넌트, 폴더 구조, 서버 액션 설계까지 일괄 주도

- **보험 상담 폼 시스템 구현**
  - 개인/법인 탭 전환, 전화번호·사업자번호 실시간 포맷팅
  - React Hook Form + Zod 스키마 검증
  - 약관 동의 모달, 이중 엔드포인트(개인/법인) 지원

- **복지몰 OAuth2 연동 서버 액션 개발**
  - 파트너별(현대이지웰/이제너두/비즈마켓) OAuth2 토큰 발급 및 인메모리 캐싱
  - 고객 조회/생성 API 연동, 상담 등록 자동화
  - 401 토큰 만료 시 재발급 리트라이 로직

- **보험 견적 비교 페이지 구현**
  - 주민번호 앞자리 인증 후 보험사별 견적 비교 테이블
  - 보장 상세 드로어, 할인 분류, 가입 링크(웹/모바일 분기)
  - 모바일 핀치 줌/팬 지원(react-zoom-pan-pinch)

- **SMS 추가 정보 수집 폼**
  - 랜덤 배열 보안 키패드로 주민번호 입력
  - RSA-OAEP 공개키 암호화 전송
  - 3단계 약관 동의(수집/제3자 제공/마케팅) 아코디언 with Notion 렌더링

- **PC/모바일 분리 레이아웃 및 ISR 최적화**
  - 디바이스 감지 후 PC/모바일 경로 자동 분기
  - FAQ, 롤링 이미지 등 ISR 적용으로 빌드 없이 콘텐츠 갱신
  - Microsoft Clarity 세션 리플레이 연동

---

## 5. 인슈어런스 앱

- **id**: carsayo-insurance-app
- **site**: https://app.carsayo.insure
- **android**: https://play.google.com/store/apps/details?id=com.carsayo.insurance&hl=ko
- **ios**:
  https://apps.apple.com/kr/app/%EC%B9%B4%EC%82%AC%EC%9A%94-%EC%9D%B8%EC%8A%88%EC%96%B4%EB%9F%B0%EC%8A%A4-%EC%B9%B4%EB%A7%A4%EB%8B%88%EC%A0%80-%EB%B0%8F-%EC%84%A4%EA%B3%84%EC%82%AC-%EC%A0%84%EC%9A%A9/id6740797750
- **periodStart**: 2025-01 (확인 필요)
- **filter**: team, feature, FE
- **skillItem**: Next.js, TypeScript, TailwindCSS, MUI, Zustand, React Query, React Hook Form, Zod

### description

보험 설계사 및 카매니저 전용 고객 관리, 계약 추적, 정산 관리 하이브리드 모바일 앱입니다. 입사 직후
신규로 착수한 프로젝트이며, 중간에 서비스 프로세스가 변경됨에 따라 전면 리뉴얼 작업도 함께
진행했습니다.

### feature

- 고객 관리 (등록/수정, 디바이스 연락처 일괄 가져오기, 메모)
- 보험 계약 관리 (월별 캘린더 뷰, 상태 필터링, 정산 정보 추적)
- 빠른 계약 등록 (정산 계좌 RSA 암호화 전송)
- FCM 푸시 알림 (네이티브 브릿지, 딥링크, 뱃지 카운트 실시간 갱신)
- NICE 본인인증 연동 회원가입/로그인
- Pull-to-Refresh 및 무한 스크롤 페이지네이션
- 네이티브 카메라 연동 (카드/A4 문서 촬영 모드)

### contribution

- **고객 관리 시스템 구현**
  - 고객 CRUD(개인/법인/영업) 및 검색/정렬 기능
  - 네이티브 브릿지를 통한 디바이스 연락처 일괄 가져오기 (Android/iOS)
  - useInfiniteQuery 기반 무한 스크롤 고객 목록

- **계약 관리 및 정산 페이지**
  - 월별 캘린더 뷰 (WheelMonthPicker), 상태별 필터링
  - 정산 예정 금액 표시, 계약 상세 정보 조회
  - 계약 리스트 무한 스크롤 + Pull-to-Refresh

- **보안 결제 정보 전송**
  - RSA-OAEP SHA-512 클라이언트 사이드 암호화(WebCrypto API)
  - iOS WebView 호환 서버 사이드 암호화 폴백
  - 정산 계좌 입력 폼 + Zod 스키마 검증

- **하이브리드 네이티브 브릿지 개발**
  - Android/iOS 네이티브 카메라 연동 (카드/A4 촬영 모드, Base64 변환)
  - FCM 토큰 등록/관리, 푸시 알림 딥링크 파싱
  - 앱 라이프사이클(onResume) 콜백으로 데이터 갱신

- **신규 구축 및 프로세스 리뉴얼**
  - 입사 직후 앱 프로젝트를 신규로 셋업 (프로젝트 구조, 디자인 시스템, 네이티브 브릿지 설계)
  - 중간에 서비스 프로세스 변경이 결정되어 화면/플로우 전면 리뉴얼 진행

- **로그인 방식 변경 (휴대폰 인증 → 아이디/패스워드)**
  - 기존 휴대폰 본인인증 기반 로그인을 아이디/패스워드 방식으로 전환
  - 회원가입/로그인 폼, 비밀번호 검증·재설정, accessToken 세션 흐름 재구성

- **인증 및 세션 관리**
  - NICE 본인인증 연동 회원가입
  - accessToken 쿠키 + Zustand persist 이중 저장
  - 401 글로벌 인터셉터로 자동 로그아웃 및 차단 상태 처리

- **iOS/Android 앱 패키징 및 배포**
  - Next.js standalone Docker 빌드 기반 배포
  - 네이티브 WebView 래퍼 앱 패키징, FCM 설정

---

## 6. 카사요 관리자 (나중에 추가 예정)

- **id**: carsayo-admin
- **site**: (내부 시스템)
- **periodStart**: 2024-12
- **filter**: team, FE
- **skillItem**: React, TypeScript, Vite, TailwindCSS, MUI, Zustand, React Query, Socket.io,
  Recharts, Zod

### description

카사요 플랫폼의 전체 서비스를 통합 관리하는 어드민 시스템입니다.

### 주요 메뉴/기능

- 대시보드 (서비스 전체 현황)
- 고객 관리 (일반 회원, 카 매니저, 탈퇴 요청, 단체 메시지 발송)
- 신청서 관리 (장기렌트/리스 실적 현황, 신청 리스트)
- 결제 관리 (Toss Payments 결제 내역, 수수료 정산)
- 마케팅 관리 (쿠콘 유입 현황, AD형 배너 트래픽)
- 내 차 팔기 (판매 검토, 경매 현황, 거래 내역, 정산, 딜러 관리, 신고 관리)
- 파트너스 관리 (공업사 목록, 스마트 정비 견적/정산)
- 보험비교 관리 (보험비교 목록, 법인 상담)
- 인슈어런스 관리 (설계사, 광고비 정산, 프로모션)
- 복지몰 파트너 관리 (베네피아, 이제너두, 현대이지웰, 비즈마켓)
- 콘텐츠 관리 (신차 데이터, 약관, 보험사 관리)
- 게시판 관리 (공지사항, FAQ)
- 시스템 관리 (관리자 계정, 권한 설정)

---

## 7. 인슈어런스 관리자 (나중에 추가 예정)

- **id**: carsayo-insurance-admin
- **site**: (내부 시스템)
- **periodStart**: 2024-12
- **filter**: team, FE
- **skillItem**: Next.js, TypeScript, TailwindCSS, Zustand, React Query, FullCalendar, ApexCharts

### description

카사요 인슈어런스 설계사 및 상담 관리 어드민 시스템입니다.

### 주요 메뉴/기능

- 설계사 관리 (등록/수정/삭제, 탈퇴 요청 처리)
- 고객 관리 (설계사별 고객 데이터)
- 상담이력 관리 (개인/법인 상담, 대기 건수 뱃지)
- 계약서 관리 (정산 현황, 정산 통계)
- 보험사 관리 (보험사 목록, 설정)
- 콘텐츠/약관/공지/FAQ 관리
- 발송 이력 조회 (SMS, 푸시 알림 로그)
- 역할 관리 (RBAC 권한 그룹)
- 캘린더 (FullCalendar 기반 일정 관리)
- 비교 분석 (상품/정책 비교 도구)

---

## 8. 카사요 서비스 통합 모노레포 구축 및 리팩토링

- **id**: carsayo-monorepo
- **periodStart**: 2026-05
- **periodEnd**: 진행 중
- **filter**: team, feature, FE
- **skillItem**: TypeScript, React 19, Next.js 16, React Native, Expo, Expo Router, NativeWind,
  pnpm Workspace, Turborepo, TanStack Query, Zustand, Zod, Vitest, GitHub Actions

### description

분리되어 있던 카사요의 Expo/React Native 앱과 Next.js 웹 프로젝트를 하나의 pnpm Workspace와
Turborepo로 통합하고, 서비스 간 중복된 API·타입·도메인·상태·검증 로직을 공유 패키지로 재설계하는
프론트엔드 모노레포 리팩토링 프로젝트입니다. 신규 서비스도 동일한 아키텍처와 개발 절차를 따르도록
구성하여 앱·웹 간 기능 정합성과 유지보수성을 함께 높이고 있습니다.

### feature

- 6개 서비스 앱 통합 운영
  - 카사요 사용자 앱 (Expo/React Native)
  - 카사요 메인 웹 (Next.js)
  - 중고차 딜러 앱 (Expo/React Native)
  - 중고차 딜러 웹 (Next.js)
  - 복지몰 지원 웹 (Next.js)
  - 법인 임직원 초대 웹 (Next.js)
- `apps/*`와 `packages/*`를 분리한 워크스페이스 디렉터리 구조
- `@repo/api`, `@repo/types`, `@repo/domain`, `@repo/constants`, `@repo/utils`, `@repo/store`,
  `@repo/hooks`, `@repo/notification-gateway` 공유 패키지
- Swagger 생성 API 클라이언트 단일화 및 앱별 API 인스턴스 주입
- 앱·웹 기능 축 페어 기반 도메인 규칙, 검증, 상태 흐름 정합
- 단일 lockfile, 루트 환경설정, Turbo task pipeline 기반 통합 명령
- Vitest 기반 공유 순수 로직 단위 테스트와 전체 워크스페이스 typecheck
- GitHub Actions 기반 앱·웹별 빌드 및 배포 파이프라인

### contribution

- **모노레포 아키텍처 및 디렉터리 구조 설계**
  - 실행 가능한 서비스는 `apps/*`, 여러 서비스가 공유하는 순수 로직은 `packages/*`로 분리
  - 앱은 모든 공유 패키지를 사용할 수 있지만 패키지는 앱을 참조하지 않도록 단방향 의존성 규칙 수립
  - 타입 전용 leaf 패키지를 분리하여 utils와 domain 사이의 순환 의존 제거
  - 패키지별 public export를 정의하여 내부 파일 경로에 직접 의존하지 않는 import 구조 구성

- **프론트엔드 공통 로직 단일 출처(SSOT) 구축**
  - 앱·웹에 중복되어 있던 Swagger 생성 API 클라이언트를 `@repo/api`로 통합
  - 차량·견적 도메인의 타입, Zod 스키마, DTO 빌더, 포맷팅·검증 로직을 공유 패키지로 이전
  - TanStack Query Hook은 API 인스턴스를 주입받는 Factory 패턴으로 설계하여 인증·baseURL 차이를
    유지하면서 조회 로직과 캐시 정책 공통화
  - 신차 견적의 선택·구매·요청 상태와 검증 함수를 `@repo/store`의 canonical Zustand Store로
    통합하고, 세션 범위 상태에는 불필요한 persist를 적용하지 않도록 정책화
  - 푸시 알림 payload 해석과 화면 이동 규칙을 notification gateway로 분리하여 사용자 앱과 딜러 앱의
    라우팅 중복 제거

- **React Native·Next.js 플랫폼 경계 관리**
  - 도메인·타입·유틸 패키지는 환경변수와 `className`에 의존하지 않는 TypeScript 로직으로 구성
  - 앱과 웹은 동일한 도메인 규칙·폼 검증·상태 전이를 사용하고, UI·스토리지·네이티브 SDK 연동만
    플랫폼별 구현으로 분리
  - 대리운전은 사용자 앱과 복지몰 웹, 중고차 딜러는 RN 앱과 Next.js 웹을 기능 축 페어로 관리
  - 플랫폼별 구현 차이를 명시적으로 문서화하여 한쪽 기능 변경 시 대응 프로젝트도 함께 검토하는 절차
    수립

- **워크스페이스 개발 환경 및 품질 검증 표준화**
  - 프로젝트별 lockfile을 루트 pnpm lockfile로 단일화하고 workspace 의존성은 `workspace:*`로 관리
  - Turborepo task dependency로 워크스페이스 의존 순서에 맞춘 build·lint·typecheck 실행을 자동화
  - 루트 명령 한 번으로 전체 앱과 패키지의 typecheck 및 API 클라이언트 생성을 실행하도록 스크립트
    통합
  - 공유 패키지의 포맷팅·검증·상태 변환 같은 순수 로직에 Vitest 단위 테스트 도입
  - React·React Native·Expo 버전 정합과 Metro의 pnpm symlink 해석을 구성하여 네이티브 번들 환경
    안정화

- **점진적 마이그레이션 및 배포 체계 구축**
  - 기존 앱·웹의 import 경로를 공유 패키지 re-export로 먼저 전환하여 대규모 수정에 따른 회귀 위험
    최소화
  - 공통화 가능한 로직과 플랫폼 전용 로직을 구분하고 사용처가 없는 추상화는 만들지 않는 점진적 이전
    원칙 적용
  - 루트 환경변수와 앱별 실행 스크립트를 정리하고 GitHub Actions 기반 서비스별 CI/CD 파이프라인 운영
  - 신규 중고차 딜러 앱·웹, 복지몰, 법인 초대 웹을 동일한 디렉터리·의존성·검증 규칙으로 확장

---

## iOS 네이티브 기능 상세 (앱 프로젝트 contribution에 반영)

### 카사요 앱 iOS 네이티브 기능

- 소셜 로그인 4종 (카카오/네이버/구글/애플) OAuth 연동
- FCM 푸시 알림 (APNs 토큰 등록, 포그라운드 알림, 딥링크 네비게이션)
- 이미지 피커 (다중 선택 최대 5장, 카메라 촬영, HEIC→JPEG 변환)
- Base64 청크 전송 (2MB 단위 분할 전송으로 대용량 이미지 처리)
- 위치 서비스 (CLLocationManager, GPS 좌표 콜백)
- Socket.IO 네이티브 연동 (사고접수 실시간 WebSocket)
- Live Activities (iOS 16.1+ Dynamic Island 지원)
- 파일 다운로드 핸들링 (Blob URL, WKDownloadDelegate)
- Universal Links (link.carsayo.net 딥링크)
- 결제 앱 스킴 등록 (토스, KB, NH, 롯데, 신한 등 간편결제)

### 인슈어런스 앱 iOS 네이티브 기능

- 커스텀 카메라 구현 (AVCaptureSession 기반)
  - 카드 모드 (0.6:1.08 비율, 명함 촬영 최적화)
  - A4 모드 (0.8:1.1312 비율, 문서 촬영 + 90도 회전)
  - 오버레이 가이드, 셔터 사운드, 자동 크롭
- FCM 푸시 알림 (APNs, 포그라운드, 딥링크)
- 디바이스 연락처 가져오기 (CNContactStore, 권한 핸들링)
- 이미지 갤러리 선택 (PHPickerViewController, JPEG 압축)
- 파일 다운로드 핸들링

---

## 공통 참고사항

### 확인 필요 항목

- [ ] 각 프로젝트 periodStart / periodEnd 정확한 날짜
- [ ] 프로젝트별 스크린샷 (thumb + 상세 이미지)
- [ ] 관리자 프로젝트 이미지 및 설명 추가 시점
