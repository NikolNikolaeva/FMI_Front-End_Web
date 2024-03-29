# Сайт за личен календар със срещи и бележки

Сайт персонален календар

## Функционалности

- ### Форма за регистрация
Формата за регистрация да има поле за email и парола, потвърждаване на парола. Да има валидация за различните полета. Когато потребител се регистрира да се провери дали вече няма такъв регистриран потребител и да се изведе грешка ако е така. Ако регистрацията е успешна данните да се запишат в local storage или онлайн база данни (например Firebase).

- ### Формата за логин
Да има валидация като тази от регистрация. Когато данните са валидни да се провери в local storage или базата дали съществува такъв потребител и ако да и паролата е коректна да се пренасочи към екран на който се листват всички срещи.

- ### Страница със срещи
  - Това е лист с всички срещи за даден човек. На този екран е визуализиран дневен / седмичен / месечен график на даден човек с неговите срещи (подобно на outlook).
  - На страницата има лаймлайн линия, която показва в коя среща сме в текущия час (подобно на outlook)

- ### Приятели
    - Всеки един потребител на системата може да добавя в приятели друг потребител в системата.
    - Всеки потребител може да вижда календарите на своите приятели
    - Календари на приятели се визуализират в страницата като тази със срещи

- ### Среща
    - Една среща има заглавие, старт, край, и описание
    - Всеки потребител може да създава срещи и да включва участници в тях (измежду всички потребители в системата)
    - Всеки потребител може да оставя коментар във всяка среща, който е видим за всички

- ### Получаване на среща
    - Когато потребител получи покана за среща той може да я откаже или приеме
    - Когато все още не е приел / отказал, всички такива (pending) срещи са показани в списък с нови срещи



## Бележки
- Имаме няколко основни страници
  - Логин
  - Регистрация (може да се направи на 1 с логин)
  - Личен Календар
  - Споделен календар (пример: Календарът на Иван, може да се ползва страницата за личен календар)
  - Поробности за среща (може да е в диалог или нещо на същата страница като календар)
  - Страница за приятелства
    - изброени са всички приятели
    - търсене на нови хора
    - добавяне на нови хора (когато добавим приятел, той не получава покана, просто може да вижда нашия календар)
  - Страница за създаване на среща
  - Страница с pending срещи
- Валидирайте максимално много неща и показвайте смислени съобщения за грешки.


## Примери

- Outlook
- Което и да е друго приложение календар