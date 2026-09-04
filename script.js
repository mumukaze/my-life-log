// ==========================
// 今日の日付
// ==========================

const today = new Date();

const year =
    today.getFullYear();

const month =
    String(today.getMonth() + 1)
        .padStart(2, "0");

const day =
    String(today.getDate())
        .padStart(2, "0");

const todayText =
    `${year}.${month}.${day}`;

document.getElementById("today")
    .textContent = todayText;


// ==========================
// HTML要素
// ==========================

const categoryInput =
    document.getElementById("category");

const contentInput =
    document.getElementById("content");

const saveButton =
    document.getElementById("save-button");

const recordsList =
    document.getElementById("records-list");

const newCategoryInput =
    document.getElementById("new-category");

const addCategoryButton =
    document.getElementById("add-category-button");

const categoriesList =
    document.getElementById("categories-list");

const exportStartDate =
    document.getElementById("export-start-date");

const exportEndDate =
    document.getElementById("export-end-date");

const exportMarkdownButton =
    document.getElementById(
        "export-markdown-button"
    );


// ==========================
// カテゴリ
// ==========================

const defaultCategories = [
    "気づき",
    "感情",
    "考え",
    "アイデア",
    "願望"
];


function getCategories() {

    const savedCategories =
        localStorage.getItem("categories");

    if (savedCategories === null) {

        localStorage.setItem(
            "categories",
            JSON.stringify(defaultCategories)
        );

        return defaultCategories;
    }

    return JSON.parse(savedCategories);
}


// ==========================
// 記録画面のカテゴリ選択肢
// ==========================

function displayCategoryOptions() {

    const categories =
        getCategories();

    categoryInput.innerHTML = "";

    categories.forEach(
        function (category) {

            const option =
                document.createElement("option");

            option.value = category;

            option.textContent =
                category;

            categoryInput.appendChild(
                option
            );
        }
    );
}


// ==========================
// 管理画面のカテゴリ一覧
// ==========================

function displayCategories() {

    const categories =
        getCategories();

    categoriesList.innerHTML = "";


    categories.forEach(
        function (category, index) {

            const item =
                document.createElement("div");

            item.className =
                "category-item";


            // カテゴリ名
            const name =
                document.createElement("div");

            name.className =
                "category-name";

            name.textContent =
                category;


            // ボタン全体
            const actions =
                document.createElement("div");

            actions.className =
                "category-actions";


            // ==========================
            // 並び替え
            // ==========================

            const order =
                document.createElement("div");

            order.className =
                "category-order";


            // 上へ
            const upButton =
                document.createElement("button");

            upButton.textContent =
                "↑";

            upButton.addEventListener(
                "click",
                function () {

                    moveCategory(
                        index,
                        -1
                    );
                }
            );


            // 一番上なら無効
            if (index === 0) {
                upButton.disabled = true;
            }


            // 下へ
            const downButton =
                document.createElement("button");

            downButton.textContent =
                "↓";

            downButton.addEventListener(
                "click",
                function () {

                    moveCategory(
                        index,
                        1
                    );
                }
            );


            // 一番下なら無効
            if (
                index ===
                categories.length - 1
            ) {
                downButton.disabled = true;
            }


            order.appendChild(
                upButton
            );

            order.appendChild(
                downButton
            );


            // ==========================
            // 編集
            // ==========================

            const editButton =
                document.createElement("button");

            editButton.textContent =
                "編集";

            editButton.addEventListener(
                "click",
                function () {

                    editCategory(index);
                }
            );


            // ==========================
            // 削除
            // ==========================

            const deleteButton =
                document.createElement("button");

            deleteButton.textContent =
                "削除";

            deleteButton.addEventListener(
                "click",
                function () {

                    deleteCategory(index);
                }
            );


            // ボタンをまとめる
            actions.appendChild(
                order
            );

            actions.appendChild(
                editButton
            );

            actions.appendChild(
                deleteButton
            );


            // カテゴリ項目に追加
            item.appendChild(
                name
            );

            item.appendChild(
                actions
            );


            categoriesList.appendChild(
                item
            );
        }
    );
}


// ==========================
// カテゴリを並び替える
// ==========================

function moveCategory(
    index,
    direction
) {

    const categories =
        getCategories();

    const newIndex =
        index + direction;


    // 範囲外なら何もしない
    if (
        newIndex < 0 ||
        newIndex >= categories.length
    ) {
        return;
    }


    // 2つのカテゴリを入れ替える
    const temporary =
        categories[index];

    categories[index] =
        categories[newIndex];

    categories[newIndex] =
        temporary;


    // 保存
    localStorage.setItem(
        "categories",
        JSON.stringify(categories)
    );


    // 画面を更新
    displayCategories();

    displayCategoryOptions();
}


// ==========================
// カテゴリを追加
// ==========================

addCategoryButton.addEventListener(
    "click",
    function () {

        const newCategory =
            newCategoryInput.value.trim();


        if (newCategory === "") {

            alert(
                "カテゴリ名を入力してください。"
            );

            return;
        }


        const categories =
            getCategories();


        if (
            categories.includes(
                newCategory
            )
        ) {

            alert(
                "同じ名前のカテゴリがあります。"
            );

            return;
        }


        categories.push(
            newCategory
        );


        localStorage.setItem(
            "categories",
            JSON.stringify(categories)
        );


        newCategoryInput.value = "";


        displayCategories();

        displayCategoryOptions();
    }
);


// Enterキーでも追加

newCategoryInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            addCategoryButton.click();
        }
    }
);


// ==========================
// カテゴリを編集
// ==========================

function editCategory(index) {

    const categories =
        getCategories();

    const oldName =
        categories[index];


    const newName =
        prompt(
            "カテゴリ名を変更してください。",
            oldName
        );


    if (newName === null) {
        return;
    }


    const trimmedName =
        newName.trim();


    if (trimmedName === "") {

        alert(
            "カテゴリ名を入力してください。"
        );

        return;
    }


    if (
        categories.includes(
            trimmedName
        )
        &&
        trimmedName !== oldName
    ) {

        alert(
            "同じ名前のカテゴリがあります。"
        );

        return;
    }


    categories[index] =
        trimmedName;


    localStorage.setItem(
        "categories",
        JSON.stringify(categories)
    );


    displayCategories();

    displayCategoryOptions();
}


// ==========================
// カテゴリを削除
// ==========================

function deleteCategory(index) {

    const categories =
        getCategories();


    if (
        categories.length === 1
    ) {

        alert(
            "カテゴリは最低1つ残してください。"
        );

        return;
    }


    const categoryName =
        categories[index];


    const confirmed =
        confirm(
            `「${categoryName}」を削除しますか？`
        );


    if (!confirmed) {
        return;
    }


    categories.splice(
        index,
        1
    );


    localStorage.setItem(
        "categories",
        JSON.stringify(categories)
    );


    displayCategories();

    displayCategoryOptions();
}


// ==========================
// 記録する
// ==========================

saveButton.addEventListener(
    "click",
    function () {

        const category =
            categoryInput.value;

        const content =
            contentInput.value.trim();


        if (content === "") {

            alert(
                "記録する内容を入力してください。"
            );

            return;
        }


        const now =
            new Date();


        const record = {

            id: Date.now(),

            createdAt:
                now.toISOString(),

            category:
                category,

            content:
                content
        };


        const savedRecords =
            JSON.parse(
                localStorage.getItem(
                    "records"
                )
            ) || [];


        savedRecords.push(
            record
        );


        localStorage.setItem(
            "records",
            JSON.stringify(
                savedRecords
            )
        );


        contentInput.value = "";


        displayRecords();


        alert(
            "記録しました。"
        );
    }
);


// ==========================
// 記録一覧を表示
// ==========================

function displayRecords() {

    const records =
        JSON.parse(
            localStorage.getItem(
                "records"
            )
        ) || [];


    recordsList.innerHTML = "";


    if (records.length === 0) {

        recordsList.textContent =
            "まだ記録がありません。";

        return;
    }


    const reversedRecords =
        [...records].reverse();


    reversedRecords.forEach(
        function (record) {

            const recordElement =
                document.createElement(
                    "article"
                );

            recordElement.className =
                "record";


            // 日付
            const dateElement =
                document.createElement(
                    "div"
                );

            dateElement.className =
                "record-date";


            const date =
                new Date(
                    record.createdAt
                );


            dateElement.textContent =
                `${date.getFullYear()}.${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}.${String(
                    date.getDate()
                ).padStart(2, "0")}`;


            // カテゴリ
            const categoryElement =
                document.createElement(
                    "div"
                );

            categoryElement.className =
                "record-category";

            categoryElement.textContent =
                record.category;


            // 内容
            const contentElement =
                document.createElement(
                    "div"
                );

            contentElement.className =
                "record-content";

            contentElement.textContent =
                record.content;


            recordElement.appendChild(
                dateElement
            );

            recordElement.appendChild(
                categoryElement
            );

            recordElement.appendChild(
                contentElement
            );


            recordsList.appendChild(
                recordElement
            );
        }
    );
}


// ==========================
// Markdownでデータを書き出す
// ==========================

exportMarkdownButton.addEventListener(
    "click",
    function () {

        const startDate =
            exportStartDate.value;

        const endDate =
            exportEndDate.value;


        // 日付が入力されていない場合
        if (
            startDate === "" ||
            endDate === ""
        ) {

            alert(
                "開始日と終了日を指定してください。"
            );

            return;
        }


        // 開始日が終了日より後の場合
        if (
            startDate > endDate
        ) {

            alert(
                "開始日は終了日以前にしてください。"
            );

            return;
        }


        // 保存されている記録を取得
        const records =
            JSON.parse(
                localStorage.getItem(
                    "records"
                )
            ) || [];


        // 指定期間の記録だけを取得
        const filteredRecords =
            records.filter(
                function (record) {

                    const recordDate =
                        new Date(
                            record.createdAt
                        );


                    const year =
                        recordDate.getFullYear();

                    const month =
                        String(
                            recordDate.getMonth() + 1
                        ).padStart(2, "0");

                    const day =
                        String(
                            recordDate.getDate()
                        ).padStart(2, "0");


                    const dateText =
                        `${year}-${month}-${day}`;


                    return (
                        dateText >= startDate
                        &&
                        dateText <= endDate
                    );
                }
            );


        // 記録がない場合
        if (
            filteredRecords.length === 0
        ) {

            alert(
                "指定した期間に記録がありません。"
            );

            return;
        }


        // 古い記録から順番に並べる
        filteredRecords.sort(
            function (a, b) {

                return (
                    new Date(a.createdAt)
                    -
                    new Date(b.createdAt)
                );
            }
        );


        // ==========================
        // Markdownを作る
        // ==========================

        let markdown =
            "# 気づき帳\n\n";


        markdown +=
            `期間：${startDate} ～ ${endDate}\n\n`;


        markdown +=
            `記録数：${filteredRecords.length}件\n\n`;


        markdown +=
            "---\n\n";


        filteredRecords.forEach(
            function (record) {

                const date =
                    new Date(
                        record.createdAt
                    );


                const year =
                    date.getFullYear();

                const month =
                    String(
                        date.getMonth() + 1
                    ).padStart(2, "0");

                const day =
                    String(
                        date.getDate()
                    ).padStart(2, "0");


                markdown +=
                    `## ${year}.${month}.${day}\n\n`;


                markdown +=
                    `### ${record.category}\n\n`;


                markdown +=
                    `${record.content}\n\n`;


                markdown +=
                    "---\n\n";
            }
        );


        // ==========================
        // ファイルを作る
        // ==========================

        const blob =
            new Blob(
                [markdown],
                {
                    type: "text/markdown"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        // ダウンロード
        const link =
            document.createElement("a");


        link.href =
            url;


        link.download =
            `気づき帳_${startDate}_${endDate}.md`;


        link.click();


        // URLを解放
        URL.revokeObjectURL(
            url
        );
    }
);


// ==========================
// 画面切り替え
// ==========================

const screens =
    document.querySelectorAll(
        ".screen"
    );

const navButtons =
    document.querySelectorAll(
        ".nav-button"
    );


function showScreen(screenId) {

    screens.forEach(
        function (screen) {

            screen.classList.remove(
                "active"
            );
        }
    );


    const targetScreen =
        document.getElementById(
            screenId
        );


    if (targetScreen) {

        targetScreen.classList.add(
            "active"
        );
    }


    navButtons.forEach(
        function (button) {

            button.classList.remove(
                "active"
            );


            if (
                button.dataset.screen
                ===
                screenId
            ) {

                button.classList.add(
                    "active"
                );
            }
        }
    );
}


navButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const screenId =
                    button.dataset.screen;

                showScreen(
                    screenId
                );
            }
        );
    }
);


// ==========================
// 初期表示
// ==========================

displayCategoryOptions();

displayCategories();

displayRecords();

showScreen(
    "input-screen"
);