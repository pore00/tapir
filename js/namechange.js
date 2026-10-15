
document.addEventListener("DOMContentLoaded", () => {
  const link = document.getElementById("namechange-link");
  const formArea = document.getElementById("namechange-form");
  const form = document.getElementById("namechange-settings");
  const closeButton = document.getElementById("namechange-close");
  const surnameInput = document.getElementById("surname");
  const firstnameInput = document.getElementById("firstname");

  const defaultSurname = "名字";
  const defaultFirstname = "名前";

  // 保存した名前を取得
  const getName = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved === null ? defaultValue : saved;
  };

  // 入力欄に保存済みの名前を表示
  if (surnameInput) {
    surnameInput.value = getName("dreamSurname", "");
  }

  if (firstnameInput) {
    firstnameInput.value = getName("dreamFirstname", "");
  }

  // 名前変換フォームを開閉
  if (link && formArea) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      formArea.hidden = !formArea.hidden;
    });
  }

  // 閉じるボタン
  if (closeButton && formArea) {
    closeButton.addEventListener("click", () => {
      formArea.hidden = true;
    });
  }

  // 名前を保存
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      localStorage.setItem(
        "dreamSurname",
        surnameInput.value
      );

      localStorage.setItem(
        "dreamFirstname",
        firstnameInput.value
      );

      alert("名前を保存しました！");
      formArea.hidden = true;

      location.reload();
    });
  }

  // 本文中の名前変換
  const surname =
    getName("dreamSurname", "") || defaultSurname;

  const firstname =
    getName("dreamFirstname", "") || defaultFirstname;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  const nodes = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => {
    const parent = node.parentElement;

    if (
      !parent ||
      parent.closest(
        "script, style, textarea, input, button"
      )
    ) {
      return;
    }

    node.textContent = node.textContent
      .replace(/#姓#/g, surname)
      .replace(/#名#/g, firstname);
  });
});
