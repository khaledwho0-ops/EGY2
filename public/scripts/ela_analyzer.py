#!/usr/bin/env python3
"""
ela_analyzer.py
Egyptian Awareness Library - OSINT Tool
Description: Offline Error Level Analysis (ELA) script to detect digital image manipulation.
Requirements: pip install Pillow
"""

import sys
import os
import argparse
from PIL import Image, ImageChops, ImageEnhance

def perform_ela(image_path, quality=90, multiplier=15):
    print(f"[*] Starting Error Level Analysis on: {image_path}")
    
    if not os.path.exists(image_path):
        print("[-] File does not exist.")
        sys.exit(1)

    try:
        original = Image.open(image_path).convert('RGB')
        
        # Save compressed version to memory (or temp file)
        temp_path = "ela_temp.jpg"
        original.save(temp_path, "JPEG", quality=quality)
        
        # Load the compressed image
        compressed = Image.open(temp_path).convert('RGB')
        
        # Calculate the absolute difference between original and compressed
        diff = ImageChops.difference(original, compressed)
        
        # Enhance the brightness to make the differences visible
        extrema = diff.getextrema()
        max_diff = max([ex[1] for ex in extrema])
        
        if max_diff == 0:
            max_diff = 1
            
        scale = 255.0 / max_diff
        
        # Apply scaling via point evaluation
        ela_img = diff.point(lambda p: p * scale)
        
        output_path = f"ela_result_{os.path.basename(image_path)}.png"
        ela_img.save(output_path)
        
        # Cleanup
        os.remove(temp_path)
        
        print(f"[+] ELA successfully generated: {output_path}")
        print(f"[+] Look for bright white spots in the resulting image.")
        print(f"    Uniformly bright edges are normal. Out-of-place bright solid blocks indicate manipulation.")
        
    except Exception as e:
        print(f"[-] ELA Analysis failed: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Offline Error Level Analysis Tool")
    parser.add_argument("image_path", help="Path to the image file to analyze")
    parser.add_argument("--quality", type=int, default=90, help="JPEG compression quality (default 90)")
    args = parser.parse_args()

    perform_ela(args.image_path, quality=args.quality)
