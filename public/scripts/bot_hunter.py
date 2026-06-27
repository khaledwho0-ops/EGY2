#!/usr/bin/env python3
"""
bot_hunter.py
Egyptian Awareness Library - OSINT Tool
Description: Scans social media API (Twitter v2 as example) to identify coordinated bot patterns.
Requirements: pip install requests tweepy
"""

import os
import sys
import argparse
import tweepy

def analyze_user(client, username):
    print(f"[*] Analyzing user: @{username}")
    try:
        user = client.get_user(username=username, user_fields=['created_at', 'public_metrics', 'description'])
        if not user.data:
            print("[-] User not found.")
            return

        metrics = user.data.public_metrics
        followers = metrics['followers_count']
        following = metrics['following_count']
        tweet_count = metrics['tweet_count']
        created_at = user.data.created_at

        print(f"  [+] Created at: {created_at}")
        print(f"  [+] Followers:  {followers}")
        print(f"  [+] Following:  {following}")
        print(f"  [+] Tweets:     {tweet_count}")

        # Basic Heuristics
        bot_score = 0
        if following > 0 and (followers / following) < 0.1:
            print("  [!] Suspicious: Extremely low follower-to-following ratio.")
            bot_score += 30
        if tweet_count > 50000:
            print("  [!] Suspicious: Extremely high tweet volume (indicates automated retweeting).")
            bot_score += 40
        if not user.data.description:
            print("  [!] Suspicious: No bio/description.")
            bot_score += 10

        print(f"[*] Bot Probability Score: {bot_score}%")
        
    except Exception as e:
        print(f"[-] Error: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Bot Hunter - Coordinated Inauthentic Behavior Detector")
    parser.add_argument("username", help="Twitter username to scan")
    args = parser.parse_args()

    # NOTE: Requires Twitter API V2 Bearer Token in environment
    bearer_token = os.environ.get("TWITTER_BEARER_TOKEN")
    
    if not bearer_token:
        print("[-] Please set TWITTER_BEARER_TOKEN environment variable.")
        print("    Example: export TWITTER_BEARER_TOKEN='your_token_here'")
        sys.exit(1)

    client = tweepy.Client(bearer_token=bearer_token)
    analyze_user(client, args.username)
