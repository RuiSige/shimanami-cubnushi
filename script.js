// 開催履歴。今後の追加はこの配列に追記します。
const meetings = [
  {
    "number": 1,
    "code": "00",
    "date": "2022年9月25日",
    "place": "大三島",
    "flyer": "images/flyer00.jpg",
    "stickers": [
      "images/sticker-00.png"
    ]
  },
  {
    "number": 2,
    "code": "01",
    "date": "2022年12月4日",
    "place": "大島",
    "flyer": "images/flyer01.jpg",
    "stickers": [
      "images/sticker-01.png"
    ]
  },
  {
    "number": 3,
    "code": "02",
    "date": "2023年3月19日",
    "place": "大三島",
    "flyer": "images/flyer02.jpg",
    "stickers": [
      "images/sticker-02A.png",
      "images/sticker-02B.png"
    ]
  },
  {
    "number": 4,
    "code": "03",
    "date": "2023年11月12日",
    "place": "生口島",
    "flyer": "images/flyer03.jpg",
    "stickers": [
      "images/sticker-03A.png",
      "images/sticker-03B.png"
    ]
  },
  {
    "number": 5,
    "code": "04",
    "date": "2024年3月17日",
    "place": "伯方島",
    "flyer": "images/flyer04.jpg",
    "stickers": [
      "images/sticker-04A.png",
      "images/sticker-04B.png"
    ]
  },
  {
    "number": 6,
    "code": "05",
    "date": "2024年10月6日",
    "place": "大三島",
    "flyer": "images/flyer05.jpg",
    "stickers": [
      "images/sticker-05A.png",
      "images/sticker-05B.png"
    ]
  },
  {
    "number": 7,
    "code": "06",
    "date": "2025年3月16日",
    "place": "因島",
    "flyer": "images/flyer06.jpg",
    "stickers": [
      "images/sticker-06A.png",
      "images/sticker-06B.png"
    ]
  },
  {
    "number": 8,
    "code": "06Again",
    "date": "2025年4月27日",
    "place": "因島 Again!",
    "flyer": "images/flyer06Again.jpg",
    "stickers": [
      "images/sticker-06Again.png"
    ]
  },
  {
    "number": 9,
    "code": "07",
    "date": "2025年10月26日",
    "place": "大三島",
    "flyer": "images/flyer07.jpg",
    "stickers": [
      "images/sticker-07A.png",
      "images/sticker-07B.png"
    ]
  },
  {
    "number": 10,
    "code": "08",
    "date": "2026年4月26日",
    "place": "大三島",
    "flyer": "images/flyer08.jpg",
    "stickers": [
      "images/sticker-08A.png",
      "images/sticker-08B.png"
    ]
  }
];

const grid = document.querySelector("#sticker-grid");
const dialog = document.querySelector("#flyer-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDate = document.querySelector("#dialog-date");
const dialogImage = document.querySelector("#dialog-image");

meetings.forEach((meeting) => {
  let selected = 0;
  const card = document.createElement("article");
  card.className = "sticker-card";

  const imageButton = document.createElement("button");
  imageButton.type = "button";
  imageButton.className = "sticker-image-button";
  imageButton.setAttribute("aria-label", `第${meeting.number}回 / ${meeting.code === "06Again" ? "06回 Again!" : meeting.code + "回"} ${meeting.place} ${meeting.date} チラシ画像を開く`);
  const image = document.createElement("img");
  image.src = meeting.stickers[0];
  image.alt = `第${meeting.number}回 ミーティングロゴ`;
  image.loading = "lazy";
  const overlay = document.createElement("span");
  overlay.className = "sticker-date-overlay";
  const meetingLabel = `第${meeting.number}回 / ${meeting.code === "06Again" ? "06回 Again!" : meeting.code + "回"}`;
  overlay.innerHTML = `<strong>${meetingLabel}</strong><span>${meeting.place}</span><span>${meeting.date}</span><span>チラシ画像</span>`;
  imageButton.append(image, overlay);

  const dots = document.createElement("div");
  dots.className = "sticker-dots";
  if (meeting.stickers.length > 1) {
    meeting.stickers.forEach((src, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "sticker-dot";
      dot.setAttribute("aria-label", `ステッカー${index + 1}を表示`);
      dot.setAttribute("aria-pressed", String(index === 0));
      dot.addEventListener("click", () => {
        selected = index;
        image.src = meeting.stickers[selected];
        [...dots.children].forEach((button, i) => button.setAttribute("aria-pressed", String(i === selected)));
      });
      dots.append(dot);
    });
  }

  const openFlyer = () => {
    dialogTitle.textContent = `第${meeting.number}回 / ${meeting.place}`;
    dialogDate.textContent = meeting.date;
    dialogImage.src = meeting.flyer;
    dialogImage.alt = `第${meeting.number}回 ${meeting.place} 開催チラシ`;
    dialog.showModal();
  };
  imageButton.addEventListener("click", openFlyer);
  card.append(imageButton, dots);
  grid.append(card);
});

document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
