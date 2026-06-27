#!/usr/bin/env python3
"""
pdf_metadata.py
Egyptian Awareness Library - OSINT Tool
Description: Offline script to extract hidden author and creation metadata from PDF documents.
Requirements: pip install PyPDF2
"""

import sys
import os
import argparse
from PyPDF2 import PdfReader

def analyze_pdf(pdf_path):
    print(f"[*] Extracting metadata from: {pdf_path}")
    
    if not os.path.exists(pdf_path):
        print("[-] File does not exist.")
        sys.exit(1)

    try:
        reader = PdfReader(pdf_path)
        meta = reader.metadata
        
        if not meta:
            print("[-] No metadata found in PDF. It may have been scrubbed.")
            return
            
        print("\n[+] Raw PDF Metadata extracted:")
        for key, value in meta.items():
            # Clean up keys (remove leading slash)
            clean_key = key.lstrip('/')
            print(f"    {clean_key}: {value}")
            
        print("\n[*] Analysis Complete.")
        print("    Watch out for 'Producer' strings that contradict the stated author.")
        print("    Watch out for 'CreationDate' that is far earlier/later than claimed publication.")
        
    except Exception as e:
        print(f"[-] PDF Parsing failed: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Offline PDF Metadata Extractor")
    parser.add_argument("pdf_path", help="Path to the PDF file to analyze")
    args = parser.parse_args()

    analyze_pdf(args.pdf_path)
