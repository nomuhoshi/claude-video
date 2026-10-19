# video-studio

B 站 / 抖音中文科普短视频的完整工作区：每期视频的脚本、画面引擎、音效、配乐、封面模板、渲染脚本。

- `SOP.md`：短视频制作 SOP（规则、流程、修改记录）
- `交接说明.md`：偏好、规矩、项目地图
- `ws/`：工作区（还原后位于原路径 SP）
- `tools/`：字体包、soundfile 替身
- `restore.sh`：新对话里一键还原

## 新对话开工

1. `git clone` 本仓库，`bash restore.sh`
2. 读 `SOP.md` 和 `交接说明.md`
3. 新一期先用 grill-me-video 问清楚，确认开拍简报后按 SOP 做

## 每期收尾

更新 `SOP.md`（第 3 节规则 + 第 9 节修改记录），然后 `git add -A && git commit && git push`。成片 mp4 不进仓库，在对话里发给用户。
