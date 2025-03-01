# Reading files with explicit encoding

def detect_encoding(file_path):
    import chardet
    with open(file_path, 'rb') as file:
        detector = chardet.universaldetector.UniversalDetector()
        for line in file:
            detector.feed(line)
            if detector.done:
                break
        detector.close()
    return detector.result


def main():
    file_path = "bash_cheat.md"
    print(detect_encoding(file_path))

if __name__ == '__main__':
    main()