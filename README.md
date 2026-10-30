# Dusk

Dusk is a free, open-source English (US) voice for [Piper](https://github.com/OHF-Voice/piper1-gpl), a neural text-to-speech system that runs fully offline.

I use a screen reader all day, so I wanted a voice that is:

- **Clear**: clean audio, easy to understand.
- **Lively**: real ups and downs in pitch, not a flat drone.
- **Quick**: stays crisp when the speech rate is turned way up.

**Status:** still training. An early test version, Dusk Preview 1, is ready to download below. The finished voice is not out yet.

This page is the documentation: what Dusk is, how she works, how she is trained, and how to install her.

## Download

### Dusk Preview 1 (early, still a bit raspy)

You need **both** files:

- [Dusk Preview 1 voice model, dusk-preview-1.onnx (about 58 MB)](https://github.com/2three1y/dusk/releases/download/preview-1/dusk-preview-1.onnx)
- [Dusk Preview 1 settings file, dusk-preview-1.onnx.json](https://github.com/2three1y/dusk/releases/download/preview-1/dusk-preview-1.onnx.json)
- [Dusk Preview 1 release page](https://github.com/2three1y/dusk/releases/tag/preview-1)

On iPhone: tap each file link in Safari and download it. Then open the Piper - Neural TTS app, go to Settings, Import Model from Files, and pick both files from On My iPhone, Downloads. Full steps are in the Install section below.

Future previews will be added as new releases, each with its own name, so they won't replace each other.

## Contents

1. Download
2. What Dusk is
3. How Dusk works
4. How Dusk is trained
5. Versions: Compact, Standard and Enhanced
6. Previews
7. Roadmap
8. Install
9. Train Dusk yourself
10. Credits
11. License

## What Dusk is

Dusk is one voice model for Piper. Like every Piper voice, she comes as two files that always travel together:

- **The model file** (ends in `.onnx`): the trained neural network itself. This is the big file.
- **The settings file** (ends in `.onnx.json`): a small text file with the voice's name, language, sample rate, default speed, and the list of speech sounds the model knows.

Apps need both files, with matching names, in the same place. The finished files will be named `en_US-dusk-high.onnx` and `en_US-dusk-high.onnx.json`, and apps list her as "Dusk".

## How Dusk works

Piper voices use a type of neural network called VITS. Turning text into speech happens in three steps:

1. **Text to speech sounds.** The text is turned into phonemes (the individual sounds of speech) by a free tool called espeak-ng. For example, "dusk" becomes the four sounds d, uh, s, k. This is how she knows how to pronounce words.
2. **Speech sounds to audio.** The phonemes go into the neural network (the `.onnx` file), which predicts how long each sound lasts and what it sounds like, and generates the audio waveform directly.
3. **Audio out.** The result is audio at 22,050 samples per second (22,050 Hz), which apps play or your screen reader speaks.

Because everything runs on your own device, Dusk works without internet once she's installed.

### Speech settings

Three settings in the `.onnx.json` shape how she speaks:

- **length_scale**: speed. A bigger number is slower, a smaller number is faster. Dusk's default pace is about 144 words per minute, and your screen reader's rate slider still goes faster or slower from there.
- **noise_scale**: how much variation goes into the voice itself. Higher sounds more expressive but can get shaky. Lower sounds steadier and smoother.
- **noise_w**: how much variation goes into timing and rhythm. Higher sounds less robotic, lower sounds more even.

## How Dusk is trained

### The recordings

Dusk learns from one reader: Celine Major, reader 11697 in the Hi-Fi TTS dataset, which is licensed CC BY 4.0. Her recordings are LibriVox audiobooks.

I didn't use all of her audio. The notebook measures her clips and picks about 3,069 clips (about 3.5 hours) that are:

- **Lively**: the clips with the widest pitch range (most up and down in her voice).
- **Clean**: the noisiest clips, odd character voices and badly aligned clips are dropped.

The chosen clips are converted to 22,050 Hz and evened out in loudness.

### The starting point

Training from zero would take far too long on free computers. So Dusk starts from Piper's public-domain LJ Speech "high" voice, which already knows how to speak English. Training then teaches it to sound like Dusk instead. This is called fine-tuning or warm-starting.

### Where and how long

- Training runs on Google Colab's free T4 GPU, using the notebook in this repo.
- Batch size is 12 clips at a time (16 ran out of GPU memory on the T4).
- The plan is 110 epochs (one epoch is one pass through all the clips), which is about 19 hours of GPU time in total.
- Colab disconnects free sessions, so training happens in sessions. Checkpoints (saved snapshots of the model) go to Google Drive, and the next session resumes from the newest one.
- Colab's free GPU time has a limit. When it runs out, training waits until Google gives the GPU back, so finishing takes several days.

## Versions: Compact, Standard and Enhanced

All versions are the same voice. They differ in size and in how long she has trained.

### Dusk Compact

- For the iPhone app Piper - Neural TTS.
- Half precision (fp16), about 58 MB.
- Also comes split into two parts, an encoder and a decoder, to use less memory. iOS gives voice apps very little memory, and a full-size voice can get cut off on long text, so VoiceOver falls back to its default voice. Compact avoids that.
- Files: `dusk-compact-ios.zip`, with the half-size `en_US-dusk-high.onnx`, its `.onnx.json`, plus `en_US-dusk-high.encoder.onnx` and `en_US-dusk-high.decoder.onnx`.

### Dusk Standard

- For NVDA, Android, Piper on a computer and Home Assistant.
- Full precision (fp32), about 110 MB.
- Files: `dusk-standard.zip`, with the full-size `en_US-dusk-high.onnx` and its `.onnx.json`.

### Dusk Enhanced

- Coming later.
- The same voice, trained longer.

### About the Compact recipe

The Compact files are made with a half-precision conversion and Piper's own encoder and decoder splitter. I tested the recipe on the public LJ Speech "high" voice, and it matched the Piper iPhone app's own published compact files (same inputs and outputs, identical audio with randomness turned off). Split voices are new in the iPhone app, so some app versions may only accept the half-size `.onnx` and `.onnx.json` without the two split files.

## Previews

Previews are early test versions made from a checkpoint partway through training, so I can hear how she's coming along.

### Dusk Preview 1

- Made from the epoch 25 checkpoint.
- Compact size (fp16, about 58 MB).
- Files: `dusk-preview-1.onnx` and `dusk-preview-1.onnx.json`.
- Download links are in the Download section at the top of this page.
- How she sounds: clearly understandable, but still raspy and a bit shaky. That's normal for a voice this early in training, and it smooths out as training continues.

### Why each preview has its own name

The iPhone app keeps track of voices by the name inside the settings file. If two voices share the same identity, a new one replaces the old one, or the app keeps the old one loaded. So every preview gets its own name and dataset id. Preview 1 is named "Dusk Preview 1", with the dataset id `dusk_preview_1`. That way previews and the finished Dusk can sit side by side on one phone.

## Roadmap

1. **Keep training** until the full 110 epochs are done, then release Dusk Standard and Dusk Compact.
2. **Next build: blend in more openly licensed voices.** The plan is to add recordings from Kristin (public domain, from LibriVox) and HFC Female (licensed CC BY-NC-SA 4.0), alongside Celine Major. The goal is a voice with lively pitch, strong clarity and crisp consonants.
3. **Dusk Enhanced**: the same voice, trained longer.
4. **Later:** maybe submit Dusk to Piper's official voice list. That's up to the Piper maintainers.

**License note for the blended build:** if HFC Female's recordings are used, that build's voice files will be CC BY-NC-SA 4.0. That means non-commercial use only, and anything made from them has to use the same license. Builds trained only on Celine Major (and public domain data) stay CC BY 4.0.

## Install

The finished files will be on this repo's [Releases page](https://github.com/2three1y/dusk/releases). Short steps are below. Longer notes for each app: [Dusk integration notes](docs/integrations.md).

### iPhone (VoiceOver), with Dusk Compact

Uses the free, open-source app [Piper - Neural TTS on the App Store](https://apps.apple.com/us/app/piper-neural-tts/id6759636010). It needs iOS 18.

1. Download `dusk-compact-ios.zip` from Releases and unzip it in the Files app.
2. Make sure the files are real local files in **On My iPhone**. Files that are still in iCloud Drive, Google Drive, Dropbox or another cloud provider can show up dimmed in the import picker, or fail to import without saying anything. If they're dimmed, copy them into On My iPhone first (for example: open the file in the cloud app, Share, Save to Files, On My iPhone).
3. Open Piper - Neural TTS, go to Settings, then **Import Model from Files**.
4. Select `en_US-dusk-high.onnx` and `en_US-dusk-high.onnx.json` in one pick. If your app version supports split voices, also select `en_US-dusk-high.encoder.onnx` and `en_US-dusk-high.decoder.onnx`. Then tap Install.
5. In iPhone Settings: Accessibility, VoiceOver, Speech, then Add Voice (or Voice), English, and choose **Dusk**. You can also pick her for Spoken Content.

Updating to a newer Dusk: after importing, switch VoiceOver to another voice and back (or restart the phone) so it loads the new one.

### NVDA (Windows), with Dusk Standard

1. Install the [Sonata Neural Voices add-on for NVDA](https://github.com/mush42/sonata-nvda).
2. Download `en_US-dusk-high-nvda-sonata.tar.gz` from Releases.
3. In NVDA: open Sonata's voice manager, Installed tab, "Install from local file", and pick the file.
4. Restart NVDA, then choose Sonata and Dusk in NVDA's speech settings.

### Android, with Dusk Standard

1. Install [SherpaTTS from F-Droid](https://f-droid.org/en/packages/org.woheller69.ttsengine/) (Android 10 or newer).
2. Download `vits-piper-en_US-dusk-high.tar.bz2` from Releases and unpack it.
3. In SherpaTTS: Manage Languages, Install from SD Card, language code `eng`, name `Dusk`, then pick `en_US-dusk-high.onnx` and `tokens.txt` from the unpacked folder.
4. Android Settings, Accessibility, Text-to-speech output: choose SherpaTTS.

### Piper on a computer (Windows, Mac, Linux), with Dusk Standard

Put both Standard files in one folder, then run:

```
pip install piper-tts
python3 -m piper -m en_US-dusk-high --data-dir /folder/with/both/files -f test.wav -- "Hi, I'm Dusk."
```

### Home Assistant, with Dusk Standard

Put both Standard files in `/share/piper` and restart.

### JAWS (Windows): not tested yet

JAWS can use Windows SAPI 5 voices, and the [Windows text-to-speech bridge for Piper voices](https://github.com/Lej77/windows-text-to-speech) is a SAPI 5 engine that runs Piper voices. I haven't confirmed it works with JAWS yet. Steps are in the [Dusk integration notes](docs/integrations.md).

## Train Dusk yourself

The whole training process is one notebook: [the Dusk Colab notebook](dusk_colab.ipynb).

1. Open the notebook in Google Colab.
2. Runtime menu, Change runtime type, choose T4 GPU, then Save.
3. Runtime menu, Run all (Ctrl+F9). Allow Google Drive access when asked.
4. Everything is saved in one folder in your Google Drive, `Dev/Dusk`: the data, checkpoints, samples, logs and the finished voice. The notebook doesn't touch anything else in your Drive.
5. If Colab disconnects or your free GPU time runs out, come back later, connect again and press Run all. It skips what's already done and resumes from the newest checkpoint.
6. The Preview cell makes an early test voice from the newest checkpoint, saved in `Dev/Dusk/export/preview-1`.
7. When training is done, the finished voice lands in `Dev/Dusk/export` as `dusk-standard.zip` and `dusk-compact-ios.zip`.

The Settings cell at the top is the only one you should need to change. The notebook's last section, "If something goes wrong", covers common errors like running out of GPU memory.

## Credits

- **Voice data:** "Hi-Fi Multi-Speaker English TTS Dataset" (Hi-Fi TTS) by Evelina Bakhturina, Vitaly Lavrukhin, Boris Ginsburg and Yang Zhang (NVIDIA), 2021. [Hi-Fi TTS on OpenSLR](https://www.openslr.org/109/). Licensed [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
- **Reader:** Celine Major, Hi-Fi TTS speaker 11697 (a LibriVox volunteer reader). Original recordings from [LibriVox](https://librivox.org), public domain.
- **Changes to the data:** about 3.5 hours of her clips selected for pitch range and cleanliness, resampled to 22,050 Hz and loudness-normalized.
- **Starting model:** Piper "ljspeech" high checkpoint by Bryce Beattie (public domain), from the [Piper checkpoints collection on Hugging Face](https://huggingface.co/datasets/rhasspy/piper-checkpoints), trained on the [LJ Speech Dataset](https://keithito.com/LJ-Speech-Dataset/) by Keith Ito and Linda Johnson (public domain).
- **Trained with Piper:** [Piper's training code on GitHub](https://github.com/OHF-Voice/piper1-gpl). Piper's code is GPL-3.0. It's used to train Dusk and is not part of the voice files.
- **iPhone app:** Piper - Neural TTS by Ihor Shevchuk, [source code for the iPhone app](https://github.com/piper-tts-apps/piper-app-apple).

Dusk is not endorsed by the reader, NVIDIA, LibriVox, the Piper project or the app's developer. See the [Dusk model card](MODEL_CARD.md) for the full data notice.

## License

- **Code** (the notebook and scripts): [MIT License](LICENSE).
- **Voice files** (once released): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), inherited from the training data. Use them, share them and build on them, including in apps. Just keep the credits above with them.
- **Blended builds:** a build that uses HFC Female's recordings will be CC BY-NC-SA 4.0 (non-commercial, share-alike), as explained in the Roadmap.

---

Co-written with Tab
