# HNG9 Task

A CLI tool to generate SHA-256 hashes from auto-generated CHIP-0007 JSON files 

## Getting Started

#### Clone the repo:

```bash
# via HTTPS
git clone https://github.com/ChukwunonsoFrank/i9-sha256-json.git

# via SSH
git clone git@github.com:ChukwunonsoFrank/i9-sha256-json.git

cd i9-sha256-json
```

#### Install dependencies:

```bash
npm install
```

## How it works

To generate the CHIP-0007 compatible JSON files, run the following command in the terminal

```bash
./script.js
```

It will prompt you to enter the CSV filename you want to generate JSON files and file hashes from.
Type in `all-teams.csv` as your filename and press Enter/Return

![terminal-prompt-for-cli](https://github.com/ChukwunonsoFrank/i9-sha256-json/blob/main/terminal-prompt.jpg "terminal-prompt-for-cli")

> Note: The `all-teams.csv` file is already provided for you in the codebase for ease of use as it contains the data needed to run the script.