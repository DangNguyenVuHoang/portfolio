document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadCvBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadSampleCV);
    }
});

function downloadSampleCV() {
    // Đường dẫn đến file CV mẫu - thay đổi này thành đường dẫn thực tế của bạn
    // const cvUrl = 'https://drive.usercontent.google.com/u/0/uc?id=1oLO1CEHGaHORWti5KROONCvy9MQUrIeH&export=download';
   const cvUrl = 'https://drive.usercontent.google.com/u/0/uc?id=14oouql6ExhZSja8Wm_imgj1P5P0k2PwA&export=download';
   
    
    // Tên file khi tải về - có thể thay đổi
    const fileName = 'CV-DangNguyenVuHoang.pdf';
    
    // Tạo một thẻ a ẩn để tải file
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // (Optional) Thêm hiệu ứng hoặc thông báo sau khi tải
    console.log('Đã bắt đầu tải CV mẫu');
}