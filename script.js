function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }, (err) => {
        console.error('Could not copy text: ', err);
    });
}
