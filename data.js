window.DIA_SITE_DATA = {
  "activeCaseId": "DIA-2003-017",
  "activeSeasonId": "S1",
  "ui": {
    "brandTitle": "Digital Incident Archive",
    "accessTag": "RESTRICTED ACCESS",
    "visitorId": "ACCESS NODE: VISITOR_017",
    "nav": {
      "home": "HOME",
      "case": "CASE FILES",
      "archive": "EVIDENCE ARCHIVE",
      "terminal": "RECOVERY TERMINAL",
      "log": "SYSTEM LOG",
      "hints": "참조 기록"
    },
    "panels": {
      "currentCase": "CURRENT CASE",
      "notice": "NOTICE",
      "archiveNotes": "ARCHIVE NOTES",
      "lockedFiles": "열람 제한 자료",
      "hintDirectory": "참조 기록",
      "recoveryTerminal": "RECOVERY TERMINAL",
      "systemLog": "SYSTEM LOG",
      "unresolvedItems": "UNRESOLVED ITEMS",
      "publicAnalysis": "PUBLIC ANALYSIS",
      "fileRelation": "FILE RELATION",
      "evidenceArchive": "EVIDENCE ARCHIVE",
      "caseSummary": "CASE SUMMARY",
      "caseFileSummary": "CASE FILE SUMMARY",
      "activePuzzles": "ACTIVE PUZZLES",
      "detailNoPreview": "NO PREVIEW / 고화질 이미지가 아직 등록되지 않았습니다."
    },
    "buttons": {
      "openCaseFile": "OPEN CASE FILE",
      "viewAll": "VIEW ALL",
      "openFile": "OPEN FILE",
      "viewLog": "VIEW LOG",
      "returnArchive": "RETURN ARCHIVE",
      "returnTerminal": "RETURN TERMINAL",
      "openRecovery": "OPEN RECOVERY",
      "verifyCode": "VERIFY CODE"
    },
    "labels": {
      "season": "시즌",
      "incidentDate": "사건 발생일",
      "firstRegistered": "최초 등록일",
      "caseStatus": "사건 상태",
      "recovery": "복구율",
      "publicFiles": "공개 자료",
      "latestUpdate": "최근 갱신",
      "keyQuestion": "KEY QUESTION",
      "currentlyPublicFiles": "CURRENTLY PUBLIC FILES",
      "fileRelationPreview": "FILE RELATION PREVIEW",
      "connectedEvidence": "CONNECTED EVIDENCE",
      "reward": "REWARD",
      "recoverySteps": "RECOVERY STEPS",
      "mode": "Mode",
      "evidenceCode": "증거 코드",
      "fileTitle": "자료명",
      "date": "날짜",
      "status": "상태",
      "archivistNote": "기록관 메모",
      "connectedPuzzle": "연결 퍼즐",
      "relatedFiles": "연결 자료"
    },
    "terminal": {
      "intro": "입력한 코드를 확인하십시오.",
      "placeholder": "CODE 입력",
      "defaultMessage": "대기 중. 복구 코드를 입력하십시오.",
      "emptyMessage": "현재 공개 자료만으로는 확인되지 않습니다.",
      "failMessage": "현재 공개 자료만으로는 확인되지 않습니다.",
      "successMessage": "자료 상태가 열람 가능으로 전환되었습니다.",
      "noAccessMessage": "열람 권한이 없습니다."
    },
    "statusLabels": {
      "partial": "부분 공개",
      "public": "공개",
      "locked": "잠금 상태",
      "failed": "복구 실패",
      "denied": "접근 거부"
    },
    "moduleNotice": "실제 조작 기능은 이후 자료가 공개될 때 연결됩니다. 현재는 퍼즐 진입 구조와 상태 표시만 활성화되어 있습니다.",
    "footerSystem": "D.I.A EVIDENCE RECOVERY SYSTEM\nTERMINAL v2.3.1"
  },
  "seasons": [
    {
      "id": "S1",
      "title": "Season 1 / 원숭이손 사건",
      "caseId": "DIA-2003-017",
      "status": "ACTIVE",
      "visibility": "부분 공개",
      "evidenceCount": 12
    },
    {
      "id": "S2",
      "title": "Season 2 / 귀환자 사건",
      "caseId": "DIA-2007-041",
      "status": "PLANNED",
      "visibility": "비공개",
      "evidenceCount": 0
    }
  ],
  "cases": [
    {
      "id": "DIA-2003-017",
      "seasonId": "S1",
      "title": "원숭이손 사건",
      "incidentDate": "2003.09.18",
      "firstRegistered": "2003.11.15",
      "status": "부분 공개",
      "recovery": 27,
      "publicFiles": "3 / 12",
      "latestUpdate": "R-01 실종신고서 추가",
      "source": "복구된 기록 보관 매체",
      "notice": "본 보관소의 자료는 특별한 사유가 없는 한 임의로 삭제 또는 변경되지 않습니다.\n\n일부 자료는 손상, 제한 공개, 또는 열람 권한 부족으로 표시되지 않을 수 있습니다.",
      "keyQuestion": "아버지는 무엇을 외면했는가?"
    }
  ],
  "evidences": [
    {
      "id": "R-01",
      "seasonId": "S1",
      "title": "실종신고서",
      "type": "Record",
      "visualType": "doc",
      "date": "2003.09.15",
      "status": "partial",
      "recovery": 82,
      "visibility": "public",
      "thumbnail": "report001.png",
      "thumbFit": "cover",
      "thumbFocus": "50% 18%",
      "previewLabel": "PARTIAL SCAN",
      "note": "하단 도장 방향 불일치 확인.",
      "puzzle": "STAMP-01",
      "related": [
        "N-01"
      ],
      "tag": "STAMP-01",
      "isNew": true
    },
    {
      "id": "P-01~P-05",
      "seasonId": "S1",
      "title": "가족사진 모음",
      "type": "Photograph",
      "visualType": "photo",
      "date": "2003.10.16",
      "status": "partial",
      "recovery": 64,
      "visibility": "restricted",
      "thumbnail": "image001.png",
      "thumbFit": "contain",
      "thumbFocus": "50% 42%",
      "previewLabel": "PARTIAL SCAN",
      "note": "촬영 시점 불일치 가능성 있음.",
      "puzzle": "P-ARRANGE-01",
      "related": [
        "P-04"
      ],
      "tag": "P-ARRANGE-01"
    },
    {
      "id": "N-01",
      "seasonId": "S1",
      "title": "지역신문 기사",
      "type": "Newspaper",
      "visualType": "news",
      "date": "2003.11.17",
      "status": "partial",
      "recovery": 71,
      "visibility": "public",
      "thumbnail": "",
      "thumbFit": "cover",
      "thumbFocus": "50% 24%",
      "previewLabel": "PARTIAL SCAN",
      "note": "하단 광고 영역에서 손 모양 로고 확인 필요.",
      "puzzle": "NEWS",
      "related": [
        "E-01"
      ],
      "tag": "NEWS"
    },
    {
      "id": "M-01",
      "seasonId": "S1",
      "title": "상담기록지",
      "type": "Medical Record",
      "visualType": "record",
      "date": "2003.12.18",
      "status": "partial",
      "recovery": 43,
      "visibility": "public",
      "thumbnail": "",
      "thumbFit": "cover",
      "thumbFocus": "50% 30%",
      "previewLabel": "PARTIAL SCAN",
      "note": "동일 문장 반복 확인.",
      "puzzle": "DATE-LINE-01",
      "related": [
        "M-02",
        "N-01"
      ],
      "tag": "DATE-LINE-01"
    },
    {
      "id": "E-01",
      "seasonId": "S1",
      "title": "증거 사진",
      "type": "Object Evidence",
      "visualType": "object",
      "date": "2003.10.25",
      "status": "partial",
      "recovery": 55,
      "visibility": "public",
      "thumbnail": "",
      "thumbFit": "cover",
      "thumbFocus": "50% 45%",
      "previewLabel": "PARTIAL SCAN",
      "note": "증거봉투 내 물체의 출처 미상.",
      "puzzle": "OBJECT-EVIDENCE",
      "related": [
        "X-01"
      ],
      "tag": "PHOTO-01"
    },
    {
      "id": "R-02",
      "seasonId": "S1",
      "title": "편지 일부",
      "type": "Letter",
      "visualType": "letter",
      "date": "2003.11.02",
      "status": "locked",
      "recovery": 18,
      "visibility": "restricted",
      "thumbnail": "",
      "thumbFit": "cover",
      "thumbFocus": "50% 50%",
      "previewLabel": "RESTRICTED",
      "note": "전문 열람 권한 제한 상태.",
      "puzzle": "LETTER-RESTORE-01",
      "related": [],
      "tag": "LETTER-01"
    },
    {
      "id": "A-01",
      "seasonId": "S1",
      "title": "전화 녹취",
      "type": "Audio",
      "visualType": "object",
      "date": "2003.10.25",
      "status": "failed",
      "recovery": 0,
      "visibility": "restricted",
      "thumbnail": "",
      "thumbFit": "cover",
      "thumbFocus": "50% 50%",
      "previewLabel": "RECOVERY FAILED",
      "note": "음성 파일 헤더 손상. 복구 실패.",
      "puzzle": "AUDIO",
      "related": [],
      "tag": "CALL-RECORD"
    },
    {
      "id": "X-01",
      "seasonId": "S1",
      "title": "비공개 자료",
      "type": "Restricted File",
      "visualType": "doc",
      "date": "UNKNOWN",
      "status": "denied",
      "recovery": 0,
      "visibility": "denied",
      "thumbnail": "",
      "thumbFit": "cover",
      "thumbFocus": "50% 50%",
      "previewLabel": "ACCESS DENIED",
      "note": "열람 요청 거부. 사유 기록 없음.",
      "puzzle": "ACCESS-DENIED",
      "related": [],
      "tag": "CLASSIFIED"
    }
  ],
  "puzzles": [
    {
      "id": "STAMP-01",
      "seasonId": "S1",
      "title": "도장 방향 복구",
      "status": "waiting",
      "mode": "rotate",
      "connectedEvidence": [
        "R-01"
      ],
      "reward": "N-01",
      "description": "R-01 하단 도장의 방향을 확인하십시오.",
      "answer": "NEWS",
      "steps": [
        "도장 영역 확대",
        "방향값 확인",
        "문자 배열 검증",
        "복구 코드 제출"
      ]
    },
    {
      "id": "P-ARRANGE-01",
      "seasonId": "S1",
      "title": "가족사진 순서 배열",
      "status": "active",
      "mode": "arrange",
      "connectedEvidence": [
        "P-01~P-05"
      ],
      "reward": "P-04 Back Note",
      "description": "가족사진의 촬영 시점을 비교하십시오.",
      "answer": "",
      "steps": [
        "사진 조각 선택",
        "촬영 시점 순서 배열",
        "촬영자 위치 비교",
        "복구 결과 저장"
      ]
    },
    {
      "id": "DATE-LINE-01",
      "seasonId": "S1",
      "title": "날짜 배열",
      "status": "locked",
      "mode": "timeline",
      "connectedEvidence": [
        "M-01",
        "N-01"
      ],
      "reward": "M-02 상담사 비공개 메모",
      "description": "공개된 날짜 기록이 부족합니다.",
      "answer": "",
      "steps": [
        "날짜 카드 로드",
        "기록 순서 배열",
        "반복 날짜 확인",
        "잠금 파일 요청"
      ]
    },
    {
      "id": "LETTER-RESTORE-01",
      "seasonId": "S1",
      "title": "편지 조각 복구",
      "status": "locked",
      "mode": "restore",
      "connectedEvidence": [
        "R-02"
      ],
      "reward": "R-02 Full Letter",
      "description": "제한 공개 자료입니다.",
      "answer": "",
      "steps": [
        "조각 스캔 로드",
        "접힌 선 기준 정렬",
        "누락 문장 확인",
        "전문 복구"
      ]
    }
  ],
  "logs": [
    {
      "seasonId": "S1",
      "date": "2024.06.28",
      "text": "R-01 실종신고서 추가"
    },
    {
      "seasonId": "S1",
      "date": "2024.06.30",
      "text": "P-01~P-05 가족사진 복구"
    },
    {
      "seasonId": "S1",
      "date": "2024.07.02",
      "text": "N-01 지역신문 기사 추가"
    },
    {
      "seasonId": "S1",
      "date": "2024.07.04",
      "text": "M-01 상담기록지 추가"
    },
    {
      "seasonId": "S1",
      "date": "2024.07.06",
      "text": "E-01 증거 사진 추가"
    },
    {
      "seasonId": "S1",
      "date": "2024.07.08",
      "text": "R-02 편지 자료 제한 공개 전환"
    },
    {
      "seasonId": "S1",
      "date": "2024.07.10",
      "text": "X-01 자료 열람 요청 거부"
    }
  ],
  "notes": [
    "R-01 하단 도장 방향 불일치 확인.",
    "P-01~P-05 촬영 시점 불일치 가능성 있음.",
    "M-01 내 동일 문장 반복 확인.",
    "일부 자료는 열람 권한 제한 상태.",
    "원본 자료 일부는 손상 또는 누락 상태."
  ],
  "hints": [
    {
      "id": "HINT-01",
      "status": "available",
      "text": "R-01 하단부를 확인하십시오.",
      "body": "도장 방향은 단순 훼손이 아닐 수 있습니다."
    },
    {
      "id": "HINT-02",
      "status": "locked",
      "text": "12시간 후 열람 가능.",
      "body": "게시물 공개 간격에 따라 자동 해금됩니다."
    },
    {
      "id": "HINT-03",
      "status": "locked",
      "text": "오답 3회 이후 열람 가능.",
      "body": "복구 터미널 입력 기록이 부족합니다."
    },
    {
      "id": "HINT-04",
      "status": "locked",
      "text": "관리자 승인 필요.",
      "body": "해당 힌트는 제한 자료와 연결되어 있습니다."
    }
  ],
  "lockedFiles": [
    {
      "id": "M-02",
      "title": "상담사 비공개 메모",
      "state": "REQUIRES ANSWER",
      "tone": "answer"
    },
    {
      "id": "R-02",
      "title": "접힌 편지 전체",
      "state": "RESTRICTED",
      "tone": "restricted"
    },
    {
      "id": "A-01",
      "title": "전화 녹취 원본",
      "state": "RECOVERY FAILED",
      "tone": "failed"
    },
    {
      "id": "P-04",
      "title": "추가 가족사진",
      "state": "RESTRICTED",
      "tone": "restricted"
    },
    {
      "id": "X-01",
      "title": "비공개 자료",
      "state": "ACCESS DENIED",
      "tone": "denied"
    }
  ],
  "publicAnalysis": [
    {
      "user": "USER_017",
      "text": "도장 방향이 알파벳처럼 보임"
    },
    {
      "user": "USER_084",
      "text": "가족사진마다 촬영자가 바뀌는 것 같음"
    },
    {
      "user": "USER_231",
      "text": "09.18과 10.18이 반복됨"
    },
    {
      "user": "USER_402",
      "text": "NEWS가 다음 자료 코드일 가능성 있음"
    }
  ],
  "unresolvedItems": [
    "P-04의 촬영자는 누구인가?",
    "09.18은 왜 반복되는가?",
    "E-01의 출처는 어디인가?",
    "R-02는 왜 제한 공개되었는가?",
    "실종신고서 도장 방향은 무엇을 가리키는가?"
  ],
  "fileRelations": [
    [
      "R-01",
      "STAMP-01"
    ],
    [
      "STAMP-01",
      "N-01"
    ],
    [
      "N-01",
      "하단 광고 손 로고"
    ],
    [
      "하단 광고 손 로고",
      "E-01"
    ]
  ],
  "publicFiles": [
    "R-01 실종신고서",
    "P-01~P-05 가족사진 모음",
    "N-01 지역신문 기사"
  ]
};
