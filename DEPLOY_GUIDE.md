# 피부과 사전 문진 앱 배포 가이드 (Vercel)

현재 로컬 환경(`http://localhost:3000`)에서 완성된 사전 문진 앱을 온라인(실제 접속 가능한 주소)으로 배포하기 위해 **Vercel**과 **GitHub**을 사용하는 방법을 안내해 드립니다. 

안티그래비티 환경에서 1차적인 초기 세팅(Git Commit)은 완료해 두었습니다. 아래 순서대로 진행해 주세요.

## 1단계: GitHub에 코드 올리기

1. **GitHub 계정 준비 및 새 Repository 생성하기**
   - [GitHub(github.com)](https://github.com/) 에 접속하여 로그인합니다.
   - 우측 상단의 `+` 버튼을 누르고 **New repository**를 클릭합니다.
   - Repository name에 `skin-clinic-survey` 라고 적고 **Create repository** 버튼을 누릅니다. (Public/Private 상관없음)

2. **안티그래비티 터미널(Terminal)에서 GitHub 연결하기**
   - 안티그래비티 상단의 **Terminal** 탭을 열고, 현재 경로인지 확인합니다. (경로: `skin-clinic-survey`)
   - 방금 GitHub에 만든 저장소(Repository) 화면에 나오는 명령어 중 **"...or push an existing repository from the command line"** 아래에 있는 내용 3줄을 복사해서 터미널에 붙여넣고 엔터(Enter)를 누릅니다.

   *(아래 명령어 코드는 예시 형식이며, 본인 GitHub 주소로 입력되어야 합니다)*
   ```bash
   git remote add origin https://github.com/본인아이디/skin-clinic-survey.git
   git branch -M main
   git push -u origin main
   ```
   > ⚠️ GitHub 로그인 연동(토큰 등)이 터미널에서 요구될 수 있습니다.

## 2단계: Vercel에서 배포하기 (무료)

1. **Vercel 로그인**
   - [Vercel(vercel.com)](https://vercel.com/) 에 접속합니다.
   - **Login** 버튼을 누르고 **Continue with GitHub**을 선택하여 방금 코드를 올린 GitHub 계정으로 로그인합니다.

2. **프로젝트 가져오기 (Import Project)**
   - 로그인 후 대시보드 우측 상단의 **Add New... > Project**를 클릭합니다.
   - 방금 전에 만든 `skin-clinic-survey` 리포지토리가 보일 것입니다. 그 옆에 있는 **Import** 버튼을 클릭합니다.

3. **배포 환경 설정 및 Deploy**
   - Vercel이 Next.js 프레임워크를 자동으로 감지합니다!
   - 별도로 설정할 것 없이 바로 파란색 **Deploy** 버튼을 클릭합니다.
   - 약 1~2분 정도의 빌드 시간이 지나면 멋진 파티 애니메이션과 함께 배포가 완료됩니다.

## 3단계: 도메인 확인 및 사용

- 배포가 완료되면, Vercel에서 제공하는 **Dashboard** 버튼을 눌러 프로젝트로 이동합니다.
- `DOMAINS` 항목을 보면 `https://skin-clinic-survey-ㅁㅁㅁ.vercel.app` 과 같은 무료 링크가 생성되어 있습니다.
- 해당 주소를 누르면 전 세계 어디서든 모바일, PC로 접속할 수 있습니다!

> 💡 **Tip:** 차후에 코드를 안티그래비티에서 수정한 후 터미널에 `git add .` -> `git commit -m "수정"` -> `git push` 만 하시면, Vercel이 알아서 자동으로 업데이트하여 배포해 줍니다!
