// スプレッドシートID（スプレッドシートのURLから取得）
const spreadsheetId = '1Y9mzKreQvx1COyQ4K3UEPhHqkDZgbvjvWlB4G27b7pQ';
const LogSheetName = "log";
const AttendanceSheetName = "";
// 時間割シートの定数
const ClassesListSheetName = "classes";
  const calendarIdColunm = 2;
  const classSheetStartRow = 4;

  const classSheetTitleColumn = 2;
  const classSheetDayColumn = 3;
  const classSheetWariColumn = 4;
// 休みカレンダー
const AbsenceCalenderName = "Absence";

// 曜日と数値の相互変換用の定数配列
const DayToNum = {"日":0,"月":1,"火":2,"水":3,"木":4,"金":5,"土":6,};
const NumToDay = ["日","月","火","水","木","金","土"]


// 出席状況の定数
const AttendanceStatuses = [
  "出席",
  "欠席",
  "公欠",
  "休校",
]


// lineBot
const BotConfigSheet = "lineBotConfig";

const BotToMe = 4;
const Token = 1;

const pushUrl='https://api.line.me/v2/bot/message/push';
const replyUrl='https://api.line.me/v2/bot/message/reply';

