# Installing Dusk: integration notes

Dusk is still training, so none of this has been tried with the real Dusk files yet. These notes come from each project's own pages. Anything marked **not verified** still needs a real test.

## iPhone: VoiceOver, with Piper - Neural TTS (Dusk Compact)

- App: [Piper - Neural TTS](https://apps.apple.com/us/app/piper-neural-tts/id6759636010), free and open source ([source](https://github.com/piper-tts-apps/piper-app-apple)). Needs iOS 18.
- It uses Apple's speech-provider API, so its voices show up as system voices that VoiceOver and Spoken Content can use.
- **Use Dusk Compact.** iOS limits how much memory a voice app's background speech part may use (about 250 MB, per the app's developer). A full-size high voice can get stopped on long text, and VoiceOver then quietly switches back to its default voice. The app's own catalog only ships high voices in half-size form for this reason.

Steps:

1. Download `dusk-compact-ios.zip` from Releases and unzip it in the Files app.
2. Keep the files in **On My iPhone**. Files sitting in iCloud Drive or Dropbox that aren't fully downloaded can fail to import, and the app may not say so.
3. Open the app, Settings, **Import Model from Files**.
4. In one pick, select `en_US-dusk-high.onnx` and `en_US-dusk-high.onnx.json`. On an app version with split voices (the 1.0.16 test build at the time of writing), also select `en_US-dusk-high.encoder.onnx` and `en_US-dusk-high.decoder.onnx`. Their names must stay exactly like that. Tap Install.
5. iPhone Settings, Accessibility, VoiceOver, Speech, Add Voice (or Voice), English, choose **Dusk**.

Good to know:

- If the app rejects the file, it shows an alert naming the missing setting. Dusk's `.onnx.json` includes everything the app requires (`piper_version`, `language`, `audio.sample_rate`, `audio.quality`) and the name field `dataset: "dusk"`.
- **Updating Dusk:** after importing a new version, switch VoiceOver to a different voice and back, or restart the phone. Otherwise the old version can stay loaded.
- If the split files aren't accepted, import just the half-size `.onnx` and `.onnx.json`.
- **Not verified:** Dusk on a real iPhone. Split-voice support in the App Store version.

## NVDA (Windows), with Sonata (Dusk Standard)

- Add-on: [Sonata Neural Voices](https://github.com/mush42/sonata-nvda). It supports Piper voices.
- Install from Releases: `en_US-dusk-high-nvda-sonata.tar.gz`. In NVDA, Sonata voice manager, Installed tab, "Install from local file". Restart NVDA.
- Sonata needs the files inside the archive named `<lang>-<name>-<quality>.onnx` / `.onnx.json` ([issue #67](https://github.com/mush42/sonata-nvda/issues/67)). Dusk's archive is built that way.
- A maintenance fork with clearer install errors: https://github.com/austek/sonata-nvda/releases/latest

## Android, with SherpaTTS (Dusk Standard)

- [SherpaTTS](https://github.com/woheller69/ttsengine) on [F-Droid](https://f-droid.org/en/packages/org.woheller69.ttsengine/). F-Droid lists Android 10 or newer.
- Use `vits-piper-en_US-dusk-high.tar.bz2` from Releases. It already has the extra metadata sherpa-onnx needs ([format](https://k2-fsa.github.io/sherpa/onnx/tts/piper.html)) and `tokens.txt`.
- SherpaTTS: Manage Languages, Install from SD Card, language code `eng`, name `Dusk`, pick `en_US-dusk-high.onnx` and `tokens.txt`.
- Android Settings, Accessibility, Text-to-speech output, choose SherpaTTS.
- **Not verified** on older Android-based devices.

## JAWS (Windows), via a SAPI 5 bridge (Dusk Standard)

- [windows-text-to-speech](https://github.com/Lej77/windows-text-to-speech) is a SAPI 5 engine that runs Piper voices.
- Setup: download `windows_tts_engine_installer.exe` and `windows_tts_engine_piper.dll` from its releases. Make a folder `piper_models` next to the DLL with `en_US-dusk-high.onnx` and `en_US-dusk-high.onnx.json` in it. Run the installer (or `regsvr32` as administrator).
- It needs the Microsoft Visual C++ Runtime and eSpeak NG data files.
- The voice appears in Control Panel, Speech, Text to Speech, and in Narrator. JAWS can use SAPI 5 voices in general.
- **Not verified with JAWS.**

## Piper on a computer (Dusk Standard)

```
pip install piper-tts
python3 -m piper -m en_US-dusk-high --data-dir /folder/with/both/files -f test.wav -- "Hi, I'm Dusk."
```

## Home Assistant (Dusk Standard)

Put `en_US-dusk-high.onnx` and `en_US-dusk-high.onnx.json` in `/share/piper` and restart.

## Getting Dusk into Piper's official voice list (later)

Community voices are added through pull requests on [rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices) on Hugging Face: `en/en_US/dusk/high/` with the model, its `.onnx.json`, a `MODEL_CARD` and a sample, plus an entry in `voices.json`. The notebook already writes a model card in their format. Merging is up to the maintainers.

---

Co-written with Tab
