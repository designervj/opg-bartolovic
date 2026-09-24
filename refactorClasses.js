const fs = require('fs');
const path = require('path');

const dirs = ['app', 'components'];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Colors
            content = content.replace(/bg-(white|neutral-50|gray-50|\[#F8F7F4\]|\[#F8F6F0\]|\[#e5e3df\])/g, 'bg-background');
            content = content.replace(/text-(neutral-900|neutral-800|gray-900|black)/g, 'text-foreground');
            content = content.replace(/text-(neutral-600|neutral-500|gray-600)/g, 'text-muted-foreground');
            content = content.replace(/bg-(neutral-900|neutral-950)/g, 'bg-foreground');
            content = content.replace(/text-(neutral-400|neutral-300)/g, 'text-muted');
            
            content = content.replace(/text-(\[#c49852\]|amber-500|yellow-500|amber-600|amber-800)/g, 'text-primary');
            content = content.replace(/bg-(\[#c49852\]|amber-500|yellow-500|amber-600)/g, 'bg-primary');
            content = content.replace(/border-(\[#c49852\]|amber-500|yellow-500|amber-600|amber-200\/60|amber-200\/80|amber-100\/80|amber-200|amber-800)/g, 'border-primary');
            content = content.replace(/bg-(amber-50|amber-100|amber-200\/50|amber-50\/70|amber-50\/50)/g, 'bg-accent');
            
            content = content.replace(/border-(neutral-200|neutral-300|neutral-100|gray-200|neutral-200\/50|neutral-200\/60)/g, 'border-border');

            // Fonts
            content = content.replace(/font-sans-custom/g, 'font-sans');
            content = content.replace(/font-mono-custom/g, 'font-mono');
            
            // Text color on dark backgrounds
            content = content.replace(/text-(\[#f7e8cf\])/g, 'text-primary-foreground');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

dirs.forEach(d => {
    if (fs.existsSync(d)) processDir(d);
});
