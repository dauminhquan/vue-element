export default {
  route: {
    dashboard: 'Dashboard',
    introduction: 'Giới thiệu',
    documentation: 'Tài liệu',
    guide: 'Hướng dẫn',
    permission: 'Giấy phép',
    pagePermission: 'Giấy phép trang',
    directivePermission: 'Giấy phép Chỉ thị',
    icons: 'Icons',
    components: 'Các thành phần',
    componentIndex: 'Giới thiệu',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'Trình chỉnh sửa JSON',
    dndList: 'Danh sách DND',
    splitPane: 'SplitPane',
    avatarUpload: 'Tải lên hình đại diện',
    dropzone: 'Vùng thả',
    sticky: 'Chú ý',
    countTo: 'Đếm đến',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    treeTable: 'Tree Table',
    customTreeTable: 'Custom TreeTable',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'Screenfull',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Đăng nhập vào hệ thống',
    logIn: 'Đăng nhập',
    username: 'Tài khoản',
    email: 'Email',
    password: 'Mật khẩu',
    any: 'any',
    password_confirm: 'Nhập lại mật khẩu',
    thirdparty: 'Đăng nhập bằng',
    registration: 'Đăng ký',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  registration: {
    email: 'Email',
    password: 'Mật khẩu',
    password_confirm: 'Điền lại mật khẩu',
    name: 'Tên người dùng',
    registration: 'Đăng ký'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    name: 'Tên người dùng',
    email: 'Email',
    password: 'Password',
    password_confirm: 'Nhập lại mật khẩu',
    notices: 'Số thông báo chưa đọc',
    messages: 'Số tin nhắn đang đợi',
    token: 'Token',
    invites: 'Số lời mời kết bạn',
    importance: 'Imp',
    type: 'Loại',
    remark: 'Ghi chú',
    search: 'Tìm kiếm',
    add: 'Thêm mới',
    export: 'Xuất Excel',
    reviewer: 'Xem lại',
    id: 'ID',
    date: 'Date',
    author: 'Tác giả',
    readings: 'Readings',
    status: 'Tình trạng',
    actions: 'Các thao tác',
    edit: 'Sửa',
    publish: 'Hiển thị',
    draft: 'Nhấp',
    delete: 'Xóa',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    on: 'Online',
    off: 'Offline',
    function: 'Các chức năng',
    post_status: 'Đăng tin lên facebook',
    select_all: 'Chọn tất cả',
    upload: 'Tải lên CSV',
    deletes: 'Xóa các mục đã chọn'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  message: {
    success: 'Thành công',
    error: 'Thất bại'
  }
}
