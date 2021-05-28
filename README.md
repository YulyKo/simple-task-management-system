# Трохи опису репозиторію

# Database
Інфологічні моделі:
  * ## Users

  | Column name | Type | Min length | Parameters |
  |--|--|--|--|
  | email | varchar(255) | 3 | by pattern email@data.some |
  | username | varchar(255) | 3 | '-' a-Z а-Я Іі Її Ґґ Єє |
  | password | varchar(255) | 6 | a-Z а-Я Іі Її Ґґ Єє 0-9 |
  | confirmeAt | varchar(255) |

  * ## Tasks

  | Column name | Type | Min length | Parameters |
  |--|--|--|--|
  | title | varchar(255) | 3 | a-Z а-Я Іі Її Ґґ Єє 0-9 |
  | description | varchar(1255) | 6 | a-Z а-Я Іі Її Ґґ Єє 0-9 |
  | isDone | boolean |
  | priority | int |
  | dueDone | date |
  | isArchived | boolean |

Даталогічна модель:

<img src="https://firebasestorage.googleapis.com/v0/b/green-peach.appspot.com/o/tms-resourses%2Fdb-tms.png?alt=media&token=02c0407d-0b81-49ed-8a43-4d68e6521ecf">
