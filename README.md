# Dusk

**Dusk has her own website now: [visit the Dusk website](https://2three1y.github.io/dusk/)** for everything in one friendly place, with links at the top that jump to each section.

Hi! Dusk is a free, open-source English (US) voice I'm making for [Piper](https://github.com/OHF-Voice/piper1-gpl), a neural text-to-speech system that runs completely offline, right on your own device.

I use a screen reader all day, every day, so I wanted a voice that actually feels good to listen to. Here's what I'm going for:

- **Clear.** Clean audio that's easy to understand.
- **Lively.** Real ups and downs in her pitch, not a flat drone.
- **Quick.** Still crisp when you crank the speech rate way up.

**Where things stand:** she's still training! The first early test version, Dusk Preview 1, is ready for you to download right below. The finished voice isn't out yet, but she's getting there.

## Download Dusk Preview 1

This is Dusk's very first preview. She's early, so she still sounds a little raspy, but she's real and you can use her today. You'll need **both** files:

- [Download the Dusk Preview 1 voice model, dusk-preview-1.onnx (about 58 MB)](https://github.com/2three1y/dusk/releases/download/preview-1/dusk-preview-1.onnx)
- [Download the Dusk Preview 1 settings file, dusk-preview-1.onnx.json (5 KB)](https://github.com/2three1y/dusk/releases/download/preview-1/dusk-preview-1.onnx.json)
- [See both files on the Dusk Preview 1 release page](https://github.com/2three1y/dusk/releases/tag/preview-1)

**On iPhone** it's quick: tap each link in Safari and choose Download. Both files land in the Downloads folder in the Files app. Then open the Piper - Neural TTS app, go to Settings, tap Import Model from Files, and pick both files from Downloads. Every future preview will get its own release with its own name, so new ones won't knock out the old ones on your phone.

## Contents

1. What Dusk is
2. How she works
3. How she's trained
4. Versions
5. Previews
6. Roadmap
7. Install
8. Train her yourself
9. Credits
10. License

## What Dusk is

Dusk is one voice model for Piper. Like every Piper voice, she comes as two files that always go together:

- **The model file** (it ends in `.onnx`). This is the trained neural network itself, the actual voice. It's the big one.
- **The settings file** (it ends in `.onnx.json`). A small text file with her name, language, sample rate, default speed, and the list of speech sounds she knows.

Apps need both files, with matching names, in the same place. When she's finished, the files will be called `en_US-dusk-high.onnx` and `en_US-dusk-high.onnx.json`, and apps will just show her as "Dusk".

## How she works

Piper voices are built on a kind of neural network called VITS. Getting from your text to her voice takes three steps:

1. **Text becomes speech sounds.** A free tool called espeak-ng turns the text into phonemes, the tiny individual sounds of speech. For example, "dusk" becomes four sounds: d, uh, s, k.
2. **Speech sounds become audio.** The phonemes go into the neural network (the `.onnx` file), which figures out how long each sound should last and what it should sound like, then creates the audio directly.
3. **Audio comes out** at 22,050 samples per second (22,050 Hz), ready for your app or screen reader.

Since it all happens on your own device, Dusk doesn't need the internet once she's installed.

Three settings in the `.onnx.json` file shape how she talks:

- **length_scale** is her speed. Bigger is slower, smaller is faster. Her default pace is about 144 words per minute, and your screen reader's rate slider can still take her faster or slower from there.
- **noise_scale** is how much variation goes into the voice itself. Higher sounds more expressive but can get shaky; lower sounds steadier.
- **noise_w** is how much variation goes into her timing and rhythm. Higher sounds less robotic, lower sounds more even.

## How she's trained

- **The recordings:** Dusk learns from one reader, Celine Major, reader 11697 in the Hi-Fi TTS dataset (licensed CC BY 4.0), reading LibriVox audiobooks. My notebook picks about 3,069 of her clips (around 3.5 hours): the liveliest ones, with the widest pitch range, and the cleanest ones, leaving out noisy clips, odd character voices and badly aligned clips. The chosen clips are converted to 22,050 Hz and evened out in loudness.
- **Where she starts from:** training from zero would take way too long on free computers, so Dusk starts from Piper's public-domain LJ Speech "high" voice, which already knows how to speak English. Training teaches it to sound like Dusk instead (that's called fine-tuning, or warm-starting).
- **Where she trains:** on Google Colab's free T4 GPU, learning from 12 clips at a time (16 ran the T4 out of memory).
- **How long:** the plan is 110 epochs (one epoch is one pass through all her clips), about 19 hours of GPU time in total. Colab disconnects free sessions, so she trains in sessions: checkpoints get saved to Google Drive, and each new session picks up from the newest one. Free GPU time has a limit too, so finishing her takes several days. Good things take time.

## Versions

Every version is the same Dusk. They just differ in size and in how long she's trained.

- **Dusk Compact** is made for the iPhone app Piper - Neural TTS. It's half precision (fp16), about 58 MB, and also comes split into an encoder and a decoder so she uses less memory. iOS gives voice apps very little memory, and a full-size voice can get cut off on long text, which makes VoiceOver fall back to its default voice. Compact avoids that. Files: `dusk-compact-ios.zip`, with the half-size `en_US-dusk-high.onnx`, its `.onnx.json`, plus `en_US-dusk-high.encoder.onnx` and `en_US-dusk-high.decoder.onnx`.
- **Dusk Standard** is made for NVDA, Android, Piper on a computer, and Home Assistant. It's full precision (fp32), about 110 MB. Files: `dusk-standard.zip`, with the full-size `en_US-dusk-high.onnx` and its `.onnx.json`.
- **Dusk Enhanced** is coming later: the same voice, trained longer.

I tested the Compact recipe (a half-precision conversion plus Piper's own encoder and decoder splitter) on the public LJ Speech "high" voice first, and it matched the Piper iPhone app's own published compact files: same inputs and outputs, and identical audio with randomness turned off. Split voices are new in the iPhone app, though, so some app versions might only accept the half-size `.onnx` and `.onnx.json` without the two split files.

## Previews

Previews are early test versions I make from a checkpoint partway through training, so I can hear how she's coming along (and so you can too).

**Dusk Preview 1** is made from the epoch 25 checkpoint, at Compact size (fp16, about 58 MB). She's totally understandable, but still raspy and a little shaky. That's normal for a voice this early in training, and it smooths out as she keeps learning.

Why every preview gets its own name: the iPhone app keeps track of voices by the name inside the settings file. If two voices share the same identity, the new one replaces the old one, or the app just keeps the old one loaded. So Preview 1 is called "Dusk Preview 1", with the dataset id `dusk_preview_1`, and the previews and the finished Dusk can all live side by side on one phone.

## Roadmap

1. **Keep training** until all 110 epochs are done, then release Dusk Standard and Dusk Compact.
2. **Next build: blend in more openly licensed voices.** I'm planning to add recordings from Kristin (public domain, from LibriVox) and HFC Female (licensed CC BY-NC-SA 4.0) alongside Celine Major, aiming for lively pitch, strong clarity and crisp consonants.
3. **Dusk Enhanced:** the same voice, trained longer.
4. **Someday, maybe:** submit Dusk to Piper's official voice list. That one's up to the Piper maintainers.

**A quick, honest license note:** if HFC Female's recordings are used, that build's voice files will be CC BY-NC-SA 4.0, which means non-commercial use only, and anything made from them has to use the same license. Builds trained only on Celine Major (and public domain data) stay CC BY 4.0.

## Install

The finished files will live on my [Dusk releases page](https://github.com/2three1y/dusk/releases). There are longer notes for each app in the [Dusk integration notes](docs/integrations.md), and step-by-step versions of everything below on the [Dusk website's install section](https://2three1y.github.io/dusk/#install).

### iPhone (VoiceOver)

You'll use the free, open-source app [Piper - Neural TTS on the App Store](https://apps.apple.com/us/app/piper-neural-tts/id6759636010). It needs iOS 18.

1. Get the files. For Dusk Preview 1, tap the two download links above in Safari and choose Download. For the finished Dusk Compact, download `dusk-compact-ios.zip` from the releases page and unzip it in the Files app.
2. Open Piper - Neural TTS, go to Settings, then **Import Model from Files**.
3. Select the `.onnx` and `.onnx.json` files in one pick (for Compact, also the encoder and decoder files if your app version supports split voices), then tap Install.
4. In iPhone Settings, go to Accessibility, VoiceOver, Speech, then Add Voice (or Voice), English, and choose **Dusk Preview 1** (or **Dusk**). You can pick her for Spoken Content too.

**Tip if the files look dimmed:** the import picker only works with real local files in On My iPhone. Files still sitting in iCloud Drive, Google Drive, Dropbox or another cloud provider can show up dimmed, or fail to import without saying anything. Copy them into On My iPhone first (for example: open the file in the cloud app, then Share, Save to Files, On My iPhone). Downloading straight from the links in Safari usually skips this problem.

Updating to a newer Dusk? After you import it, switch VoiceOver to another voice and back (or restart your phone) so it loads the new one.

### NVDA (Windows), with Dusk Standard

1. Install the [Sonata Neural Voices add-on for NVDA](https://github.com/mush42/sonata-nvda).
2. Download `en_US-dusk-high-nvda-sonata.tar.gz` from the releases page.
3. In NVDA, open Sonata's voice manager, go to the Installed tab, choose "Install from local file", and pick the file.
4. Restart NVDA, then choose Sonata and Dusk in NVDA's speech settings.

### Android, with Dusk Standard

1. Install [SherpaTTS from F-Droid](https://f-droid.org/en/packages/org.woheller69.ttsengine/) (Android 10 or newer).
2. Download `vits-piper-en_US-dusk-high.tar.bz2` from the releases page and unpack it.
3. In SherpaTTS, go to Manage Languages, then Install from SD Card. Use the language code `eng` and the name `Dusk`, then pick `en_US-dusk-high.onnx` and `tokens.txt` from the unpacked folder.
4. In Android Settings, go to Accessibility, Text-to-speech output, and choose SherpaTTS.

### Piper on a computer (Windows, Mac, Linux), with Dusk Standard

Put both Standard files in one folder, then run:

```
pip install piper-tts
python3 -m piper -m en_US-dusk-high --data-dir /folder/with/both/files -f test.wav -- "Hi, I'm Dusk."
```

### Home Assistant, with Dusk Standard

Put both Standard files in `/share/piper` and restart Home Assistant.

### JAWS (Windows): not tested yet

JAWS can use Windows SAPI 5 voices, and the [Windows text-to-speech bridge for Piper voices](https://github.com/Lej77/windows-text-to-speech) is a SAPI 5 engine that runs Piper voices. I haven't confirmed it works with JAWS yet, so I'm calling it untested for now. Steps are in the [Dusk integration notes](docs/integrations.md).

## Train her yourself

Want to try it? The whole training process lives in one notebook: [the Dusk Colab notebook](dusk_colab.ipynb).

1. Open the notebook in Google Colab.
2. In the Runtime menu, choose Change runtime type, pick T4 GPU, then Save.
3. In the Runtime menu, choose Run all (Ctrl+F9). Allow Google Drive access when it asks.
4. Everything gets saved in one folder in your Google Drive, `Dev/Dusk`: the data, checkpoints, samples, logs and the finished voice. The notebook doesn't touch anything else in your Drive.
5. If Colab disconnects or your free GPU time runs out, no worries. Come back later, connect again and press Run all. It skips whatever's already done and picks up from the newest checkpoint.
6. The Preview cell makes an early test voice from the newest checkpoint and saves it in `Dev/Dusk/export/preview-1`.
7. When training's done, the finished voice shows up in `Dev/Dusk/export` as `dusk-standard.zip` and `dusk-compact-ios.zip`.

The Settings cell at the top is the only one you should need to change. If something breaks, the notebook's last section, "If something goes wrong", covers the common errors, like running out of GPU memory.

## Credits

Dusk wouldn't exist without a lot of generous people sharing their work. Thank you!

- **Voice data:** "Hi-Fi Multi-Speaker English TTS Dataset" (Hi-Fi TTS) by Evelina Bakhturina, Vitaly Lavrukhin, Boris Ginsburg and Yang Zhang (NVIDIA), 2021. [Hi-Fi TTS on OpenSLR](https://www.openslr.org/109/). Licensed [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
- **Reader:** Celine Major, Hi-Fi TTS speaker 11697, a LibriVox volunteer reader. Original recordings from [LibriVox](https://librivox.org), public domain.
- **Changes to the data:** about 3.5 hours of her clips, selected for pitch range and cleanliness, resampled to 22,050 Hz and loudness-normalized.
- **Starting model:** Piper "ljspeech" high checkpoint by Bryce Beattie (public domain), from the [Piper checkpoints collection on Hugging Face](https://huggingface.co/datasets/rhasspy/piper-checkpoints), trained on the [LJ Speech Dataset](https://keithito.com/LJ-Speech-Dataset/) by Keith Ito and Linda Johnson (public domain).
- **Trained with Piper:** [Piper's training code on GitHub](https://github.com/OHF-Voice/piper1-gpl). Piper's code is GPL-3.0. I use it to train Dusk, and it isn't part of the voice files.
- **iPhone app:** Piper - Neural TTS by Ihor Shevchuk, [source code for the iPhone app](https://github.com/piper-tts-apps/piper-app-apple).

Dusk isn't endorsed by the reader, NVIDIA, LibriVox, the Piper project or the app's developer. The [Dusk model card](MODEL_CARD.md) has the full data notice.

## License

- **Code** (the notebook and scripts): [MIT License](LICENSE).
- **Voice files** (once released): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), which comes from the training data. Use her, share her and build on her, even in apps. Just keep the credits above with her.
- **Blended builds:** a build that uses HFC Female's recordings will be CC BY-NC-SA 4.0 (non-commercial, share-alike), like I explained in the Roadmap.

Thanks so much for stopping by and checking out Dusk. I hope she makes your day sound a little nicer.

---

Co-written with Tab
