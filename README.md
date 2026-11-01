# mcc_desk_solution

> **mcc_desk 통합 홍보 허브** — 회사·제품·서비스 철학 소개 및 채널 안내

산업용 데스크톱 모션 플랫폼 **mcc_desk**의 공개 홍보 사이트(허브)입니다. 제품·서비스의 철학을 소개하고, 역할별 채널 사이트로 안내합니다.

> 본 사이트의 콘텐츠는 데모 단계의 **가상 홍보 자료**입니다. 서비스·상품은 준비 중이며, 오픈 시 스펙 및 서비스 내용은 변경될 수 있습니다.

## 사이트

- 발행 URL: https://hjwise.github.io/mcc_desk_solution/
- 발행 방식: **GitHub Pages** (Source: `main` 브랜치 / `/docs` 폴더, 정적 HTML)

## 채널 사이트

| 채널 | URL |
|------|-----|
| 직접 도입 | https://hjwise.github.io/mcc_desk_direct/ |
| 솔루션 파트너 | https://hjwise.github.io/mcc_desk_partner/ |
| OEM / ODM | https://hjwise.github.io/mcc_desk_oem/ |
| SW 플랫폼 | https://hjwise.github.io/mcc_desk_devkit/ |
| 서비스 에이전트 | https://hjwise.github.io/mcc_desk_service/ |

## 저장소 구조 (EMVision식 정적 사이트)

```
docs/
├── .nojekyll              # Jekyll 비활성화 (순수 정적 서빙)
├── index.html            # 랜딩 (철학 소개 + 채널 라우팅)
└── assets/
    ├── css/mcc.css       # 통합 스타일 (골드×블루 · 산맥/호수/노을 컨셉)
    ├── js/mcc.js         # 공통 스크립트 (햄버거 nav + 오픈예정 모달 + 데모)
    └── img/              # 이미지·SVG 자산
```

## 로컬 미리보기

```
cd docs
python -m http.server 8000
# http://localhost:8000
```
