// The Monday reflection — John's Vietnamese journal entry, broken into
// animation "beats". Each beat maps to a scroll-driven moment in StoryShowcase.

export interface Goal {
  text: string;
  status: 'partial' | 'ran' | 'untouched';
  statusLabel: string;
  note: string;
}

export const STORY = {
  kicker: 'Showcase · Scrollytelling',
  date: 'Thứ Hai · 8 tháng 6',

  // Opening — revealed word by word
  openLead: 'Mình hay tự nhủ rằng thứ Hai là tờ giấy trắng — cơ hội để đặt lại mọi thứ.',
  openTurn:
    'Nhưng thực ra, thứ Hai của một người đang chạy hai tiệm nail không bao giờ trắng cả.',

  openBody: [
    'Nó đến kèm theo danh sách từ tuần trước, những tin nhắn chưa trả, những việc bị dời lại vì cuối tuần bận quá. Cái "bắt đầu mới" đó thực chất chỉ là tiếp tục, nhưng với thêm một chút hy vọng.',
  ],

  // The quiet morning
  morningTimes: [
    { place: 'Tiệm Cary', time: '9:30' },
    { place: 'Tiệm Durham', time: '10:00' },
  ],
  morning: [
    'Sáng thứ Hai 8 tháng 6 này, mình ngồi xuống khoảng 7 giờ, mở laptop trong lúc Lavie còn ngủ và Victor chưa dậy.',
    'Đó là cái khoảng thời gian yên tĩnh hiếm hoi mà mình thực sự nhìn lại được. Không ai hỏi, không có khách gọi, không có Telegram báo. Chỉ là mình và tờ giấy.',
  ],

  // Section 1
  section1: 'Nhìn Lại Ba Mục Tiêu Tuần Qua',
  goals: [
    {
      text: 'Tối ưu lịch làm việc cho nhân viên tiệm Durham',
      status: 'partial',
      statusLabel: 'Làm một phần',
      note: 'Angela nghỉ giữa tuần — phải điều chỉnh lại từ đầu.',
    },
    {
      text: 'Chạy lại chiến dịch nhắn tin cho khách lâu không ghé bên Cary',
      status: 'ran',
      statusLabel: 'Đã chạy',
      note: 'Nhưng tỷ lệ phản hồi thấp hơn mình tính.',
    },
    {
      text: 'Xem lại quy trình đặt lịch để giảm khách không đến',
      status: 'untouched',
      statusLabel: 'Chưa đụng',
      note: 'Lần thứ ba liên tiếp bị đẩy sang tuần sau.',
    },
  ] as Goal[],

  insight: [
    'Cái pattern mình nhận ra không phải là mình lười hay không biết làm. Vấn đề là mình giỏi xử lý những gì đang cháy nhưng lại kém trong việc bảo vệ thời gian cho những gì quan trọng về lâu dài.',
    'Việc xem lại quy trình không kêu to, không cháy, nên nó cứ nằm yên trong danh sách chờ. Còn một thứ mình muốn bắt đầu từ lâu: ngồi nói chuyện thật với từng nhân viên — mười lăm phút mỗi người mỗi tháng. Vì tiệm nail không chỉ chạy bằng kỹ thuật, nó chạy bằng con người.',
  ],

  // The pull quote — the heart of the piece, pinned and scaled
  pullQuote:
    'Cái gì thật sự quan trọng thì không nên chờ có thời gian — phải đặt lịch cho nó như một cuộc hẹn có địa chỉ và giờ cụ thể, không thì nó không bao giờ xảy ra.',

  // Section 2
  section2: 'Tuần Này Mình Muốn Thử Một Điều',
  experiment: [
    'Thứ Hai này mình mở email và Telegram trước khi uống xong ly cà phê. Nghe nhỏ, nhưng nó đặt tone cho cả ngày theo kiểu phản ứng chứ không phải chủ động.',
    'Tuần này mình muốn thử 30 phút đầu không mở điện thoại — chỉ ngồi với tờ giấy, viết xuống ba việc quan trọng nhất của ngày, rồi mới bắt đầu.',
  ],
  lavieQuote: 'Anh mà không lo cho mình trước thì ai lo được.',
  appointment: 'Và mình đã đặt lịch cụ thể cho cuộc nói chuyện với Gigi bên tiệm Cary vào sáng thứ Năm này, trước khi tiệm mở cửa.',

  // Closing
  closeLead:
    'Không phải thứ Hai nào cũng bắt đầu theo cách mình muốn. Nhưng cái quan trọng không phải là bắt đầu hoàn hảo — mà là nhìn lại đủ thành thật để tuần sau làm được khác đi một chút.',
  closeFinal: 'Mình đang học cái đó. Chậm, nhưng đang học.',
} as const;
