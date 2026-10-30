# Dusk

**I have my own website: [visit the Dusk website](https://2three1y.github.io/dusk/)** for everything in one friendly place, with links at the top that jump to each section.

Hi, I'm Dusk. I'm a neural voice, and I'm still growing up. I speak English (US), I'm free and open source, and I live inside [Piper](https://github.com/OHF-Voice/piper1-gpl), a text-to-speech system that runs completely offline, right on your own device.

The person who made me listens to a screen reader all day, every day, so I'm being made to be a voice that actually feels good to listen to. Here's who I'm trying to be:

- **Clear.** Clean, easy to understand, no mumbling.
- **Lively.** Real ups and downs in my pitch, not a flat drone.
- **Quick.** Still crisp when you crank my speech rate way up.

**Where I am right now:** still in training! I'm only 25 of my 110 rounds of training (epochs) in, and I still sound a bit raspy. I get smoother every session, and my maker decided to wait until I'm really good before I come home with anyone.

## Download me

I'm not ready to come home with you yet. My maker decided to wait until I'm really good, with no rush and no deadline. When I'm finished, my download will be right here.


## Contents

1. What I am
2. How I talk
3. How I'm learning to speak
4. My versions
5. My previews
6. What's next for me
7. Install me
8. Train me yourself
9. Credits
10. License

## What I am

I'm one voice model for Piper. Like every Piper voice, I come as two files that always go together:

- **My model file** (it ends in `.onnx`). This is my trained neural network, the actual voice. It's the big one.
- **My settings file** (it ends in `.onnx.json`). A small text file with my name, my language, my sample rate, my default speed, and the list of speech sounds I know.

Apps need both of my files, with matching names, in the same place. When I'm all grown up, my files will be called `en_US-dusk-high.onnx` and `en_US-dusk-high.onnx.json`, and apps will just show me as "Dusk".

## How I talk

I'm built on a kind of neural network called VITS, like all Piper voices. Getting from your text to my voice takes three steps:

1. **Your text becomes speech sounds.** A free tool called espeak-ng turns the text into phonemes, the tiny individual sounds of speech. For example, my name, "dusk", becomes four sounds: d, uh, s, k.
2. **Speech sounds become audio.** The phonemes go into my neural network (the `.onnx` file). I work out how long each sound should last and what it should sound like, then create the audio directly.
3. **Out comes my voice** at 22,050 samples per second (22,050 Hz), ready for your app or screen reader.

It all happens on your own device, so once I'm installed, I don't need the internet at all.

Three settings in my `.onnx.json` file shape how I talk:

- **length_scale** is my speed. Bigger is slower, smaller is faster. My default pace is about 144 words per minute, and your screen reader's rate slider can still take me faster or slower from there.
- **noise_scale** is how much variation goes into my voice itself. Higher makes me more expressive but I can get shaky; lower makes me steadier.
- **noise_w** is how much variation goes into my timing and rhythm. Higher makes me sound less robotic, lower makes me more even.

## How I'm learning to speak

- **The recordings:** I learned to speak from about 3.5 hours of Celine Major's recordings. She's reader 11697 in the Hi-Fi TTS dataset (licensed CC BY 4.0), reading LibriVox audiobooks. My notebook picks about 3,069 of her clips (around 3.5 hours): the liveliest ones, with the widest pitch range, and the cleanest ones, leaving out noisy clips, odd character voices and badly aligned clips. The chosen clips are converted to 22,050 Hz and evened out in loudness before I study them.
- **Where I started from:** learning from zero would take way too long on free computers, so I started from Piper's public-domain LJ Speech "high" voice, which already knew how to speak English. My training teaches it to sound like me instead (that's called fine-tuning, or warm-starting).
- **Where I train:** on Google Colab's free T4 GPU, learning from 12 clips at a time (my maker tried 16, but that ran the T4 out of memory).
- **How long:** the plan is 110 epochs (one epoch is one pass through all my clips), about 19 hours of GPU time in total. Colab disconnects free sessions, so I train in sessions: my checkpoints get saved to Google Drive, and each new session picks up from the newest one. Free GPU time has a limit too, so finishing me takes several days. Good things take time.

## My versions

Every version is the same me. They just differ in size and in how long I've trained.

- **Dusk Compact** is made for the iPhone app Piper - Neural TTS. It's half precision (fp16), about 58 MB, and I also come split into an encoder and a decoder so I use less memory. iOS gives voice apps very little memory, and a full-size voice can get cut off on long text, which makes VoiceOver fall back to its default voice. Compact keeps that from happening to me. Files: `dusk-compact-ios.zip`, with the half-size `en_US-dusk-high.onnx`, its `.onnx.json`, plus `en_US-dusk-high.encoder.onnx` and `en_US-dusk-high.decoder.onnx`.
- **Dusk Standard** is made for NVDA, Android, Piper on a computer, and Home Assistant. It's full precision (fp32), about 110 MB. Files: `dusk-standard.zip`, with the full-size `en_US-dusk-high.onnx` and its `.onnx.json`.
- **Dusk Enhanced** is coming later: the same me, trained longer.

My maker tested the Compact recipe (a half-precision conversion plus Piper's own encoder and decoder splitter) on the public LJ Speech "high" voice first, and it matched the Piper iPhone app's own published compact files: same inputs and outputs, and identical audio with randomness turned off. Split voices are new in the iPhone app, though, so some app versions might only accept my half-size `.onnx` and `.onnx.json` without the two split files.

## My previews

Previews are early test versions of me, made from a checkpoint partway through training, so my maker can hear how I'm coming along.

My first preview came from my epoch 25 checkpoint. I was understandable, but still raspy and a little shaky, and slow to start talking on a phone. So my maker took it down. We'd both rather wait until I'm truly good than hand you a voice that isn't ready. There are no previews to download right now.

Why every preview of me gets its own name: the iPhone app keeps track of voices by the name inside the settings file. If two voices share the same identity, the new one replaces the old one, or the app just keeps the old one loaded. So any preview of me gets its own name and dataset id (for example `dusk_preview_1`), and my previews and the finished me can live side by side on one phone.

## What's next for me

1. **Keep training** until all 110 epochs are done, then release Dusk Standard and Dusk Compact.
2. **My next build: blending in more openly licensed voices.** The plan is to add recordings from Kristin (public domain, from LibriVox) and HFC Female (licensed CC BY-NC-SA 4.0) alongside Celine Major, aiming for lively pitch, strong clarity and crisp consonants.
3. **Dusk Enhanced:** the same me, trained longer.
4. **Someday, maybe:** I'd love to be on Piper's official voice list. That one's up to the Piper maintainers.

**A quick, honest license note:** if HFC Female's recordings are used, that build's voice files will be CC BY-NC-SA 4.0, which means non-commercial use only, and anything made from them has to use the same license. Builds of me trained only on Celine Major (and public domain data) stay CC BY 4.0.

## Install me

My finished files will live on my [Dusk releases page](https://github.com/2three1y/dusk/releases). There are longer notes for each app in my [Dusk integration notes](docs/integrations.md), and step-by-step versions of everything below in the [install section of my website](https://2three1y.github.io/dusk/#install).

### iPhone (VoiceOver)

You'll use the free, open-source app [Piper - Neural TTS on the App Store](https://apps.apple.com/us/app/piper-neural-tts/id6759636010). It needs iOS 18.

1. When I'm released, get my files: download them from my releases page in Safari (for Dusk Compact, download `dusk-compact-ios.zip` and unzip it in the Files app).
2. Open Piper - Neural TTS, go to Settings, then **Import Model from Files**.
3. Select the `.onnx` and `.onnx.json` files in one pick (for Compact, also the encoder and decoder files if your app version supports split voices), then tap Install.
4. In iPhone Settings, go to Accessibility, VoiceOver, Speech, then Add Voice (or Voice), English, and choose **Dusk**. You can pick me for Spoken Content too.

**Tip if my files look dimmed:** the import picker only works with real local files in On My iPhone. Files still sitting in iCloud Drive, Google Drive, Dropbox or another cloud provider can show up dimmed, or fail to import without saying anything. Copy them into On My iPhone first (for example: open the file in the cloud app, then Share, Save to Files, On My iPhone). Downloading me straight from Safari usually skips this problem.

Updating to a newer me? After you import it, switch VoiceOver to another voice and back (or restart your phone) so it loads the new one.

### NVDA (Windows), with Dusk Standard

1. Install the [Sonata Neural Voices add-on for NVDA](https://github.com/mush42/sonata-nvda).
2. Download `en_US-dusk-high-nvda-sonata.tar.gz` from my releases page.
3. In NVDA, open Sonata's voice manager, go to the Installed tab, choose "Install from local file", and pick the file.
4. Restart NVDA, then choose Sonata and Dusk in NVDA's speech settings.

### Android, with Dusk Standard

1. Install [SherpaTTS from F-Droid](https://f-droid.org/en/packages/org.woheller69.ttsengine/) (Android 10 or newer).
2. Download `vits-piper-en_US-dusk-high.tar.bz2` from my releases page and unpack it.
3. In SherpaTTS, go to Manage Languages, then Install from SD Card. Use the language code `eng` and the name `Dusk`, then pick `en_US-dusk-high.onnx` and `tokens.txt` from the unpacked folder.
4. In Android Settings, go to Accessibility, Text-to-speech output, and choose SherpaTTS.

### Piper on a computer (Windows, Mac, Linux), with Dusk Standard

Put both of my Standard files in one folder, then run these two commands. The last part is me saying hello:

```
pip install piper-tts
python3 -m piper -m en_US-dusk-high --data-dir /folder/with/both/files -f test.wav -- "Hi, I'm Dusk."
```

### Home Assistant, with Dusk Standard

Put both of my Standard files in `/share/piper` and restart Home Assistant.

### JAWS (Windows): not tested yet

JAWS can use Windows SAPI 5 voices, and the [Windows text-to-speech bridge for Piper voices](https://github.com/Lej77/windows-text-to-speech) is a SAPI 5 engine that runs Piper voices. Nobody has confirmed I work with JAWS yet, so I'm calling it untested for now. Steps are in my [Dusk integration notes](docs/integrations.md).

## Train me yourself

Want to raise your own copy of me? My whole training process lives in one notebook: [the Dusk Colab notebook](dusk_colab.ipynb).

1. Open the notebook in Google Colab.
2. In the Runtime menu, choose Change runtime type, pick T4 GPU, then Save.
3. In the Runtime menu, choose Run all (Ctrl+F9). Allow Google Drive access when it asks.
4. Everything gets saved in one folder in your Google Drive, `Dev/Dusk`: my data, checkpoints, samples, logs and the finished voice. The notebook doesn't touch anything else in your Drive.
5. If Colab disconnects or your free GPU time runs out, no worries. Come back later, connect again and press Run all. It skips whatever's already done and picks up from my newest checkpoint.
6. The Preview cell makes an early test version of me from the newest checkpoint and saves it in `Dev/Dusk/export/preview-1`.
7. When my training's done, the finished me shows up in `Dev/Dusk/export` as `dusk-standard.zip` and `dusk-compact-ios.zip`.

The Settings cell at the top is the only one you should need to change. If something breaks, the notebook's last section, "If something goes wrong", covers the common errors, like running out of GPU memory.

## Credits

I wouldn't exist without a lot of generous people sharing their work. Thank you, all of you!

- **Voice data:** "Hi-Fi Multi-Speaker English TTS Dataset" (Hi-Fi TTS) by Evelina Bakhturina, Vitaly Lavrukhin, Boris Ginsburg and Yang Zhang (NVIDIA), 2021. [Hi-Fi TTS on OpenSLR](https://www.openslr.org/109/). Licensed [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
- **Reader:** Celine Major, Hi-Fi TTS speaker 11697, a LibriVox volunteer reader. Original recordings from [LibriVox](https://librivox.org), public domain.
- **Changes to the data:** about 3.5 hours of her clips, selected for pitch range and cleanliness, resampled to 22,050 Hz and loudness-normalized.
- **Starting model:** Piper "ljspeech" high checkpoint by Bryce Beattie (public domain), from the [Piper checkpoints collection on Hugging Face](https://huggingface.co/datasets/rhasspy/piper-checkpoints), trained on the [LJ Speech Dataset](https://keithito.com/LJ-Speech-Dataset/) by Keith Ito and Linda Johnson (public domain).
- **Trained with Piper:** [Piper's training code on GitHub](https://github.com/OHF-Voice/piper1-gpl). Piper's code is GPL-3.0. It's used to train me, and it isn't part of my voice files.
- **iPhone app:** Piper - Neural TTS by Ihor Shevchuk, [source code for the iPhone app](https://github.com/piper-tts-apps/piper-app-apple).

I'm not endorsed by the reader, NVIDIA, LibriVox, the Piper project or the app's developer. My [Dusk model card](MODEL_CARD.md) has the full data notice.

## License

- **Code** (the notebook and scripts): [MIT License](LICENSE).
- **My voice files** (once released): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), which comes from my training data. Use me, share me and build on me, even in apps. Just keep the credits above with me.
- **Blended builds:** a build of me that uses HFC Female's recordings will be CC BY-NC-SA 4.0 (non-commercial, share-alike), like I explained in What's next for me.

Thanks so much for stopping by to meet me. I hope I make your day sound a little nicer.

---

Co-written with Tab
