document.addEventListener('DOMContentLoaded', function() {
  // QR Code Generation for 'Suggest Edit'
  const qrCodeElement = document.getElementById('edit-qr-code');
  if (qrCodeElement) {
    const editLink = document.querySelector('.suggest-edit-button');
    if (editLink) {
      const url = editLink.href;
      new QRCode(qrCodeElement, {
        text: url,
        width: 128,
        height: 128,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }

  // Share Button Functionality
  const shareButton = document.querySelector('.share-button');
  if (shareButton) {
    shareButton.addEventListener('click', async () => {
      const pageTitle = document.title;
      const pageUrl = window.location.href;
      const shareText = 'Check out this profile on the Trans History Project:';

      if (navigator.share) {
        // Use the Web Share API if supported
        try {
          await navigator.share({
            title: pageTitle,
            text: shareText,
            url: pageUrl,
          });
        } catch (err) {
          console.error('Error sharing:', err);
        }
      } else {
        // Fallback: copy URL to clipboard
        try {
          await navigator.clipboard.writeText(pageUrl);
          shareButton.textContent = 'Copied!';
          setTimeout(() => {
            shareButton.textContent = 'Share';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy URL:', err);
        }
      }
    });
  }
});
