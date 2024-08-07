---
title: "PDM创建Python项目"
slug: Python PDM创建项目
description: Python PDM创建项目
meta_title: "Python PDM创建项目"
date: 2024-07-19T11:34:43+08:00
tags: ["30min","30min-python","pdm"]
categories: ["tutorials","30min","30min-python","pdm"]
draft: false
---


# PDM创建项目

PDM（Python Dependency Manager）是一个现代的Python包和依赖管理工具，支持最新的PEP标准。以下是如何使用PDM创建新项目和在已有项目中使用的简要指南：

## 创建新项目

1. **安装PDM**：
   - 推荐使用安装脚本：
     ```bash
     curl -sSL https://pdm-project.org/install-pdm.py | python3 -
     ```
   - 或者使用`pip`安装：
     ```bash
     pip install --user pdm
     ```

2. **初始化新项目**：
   - 在终端中进入你想创建项目的目录，然后运行：
     ```bash
     pdm init
     ```
   - PDM会询问一些问题来帮助生成`pyproject.toml`文件。回答这些问题后，PDM会创建一个新的项目结构。

3. **选择Python解释器**：
   - PDM会要求你选择一个Python解释器。你可以从已安装的Python版本中选择，或者通过以下命令安装新的Python解释器：
     ```bash
     pdm python install <version>
     ```
   - 选择解释器后，PDM会将其路径存储在`.pdm-python`文件中。

4. **创建虚拟环境**（可选）：
   - PDM会询问是否为项目创建虚拟环境。如果选择“是”，PDM会在项目根目录中创建一个虚拟环境，并将其用作项目的Python解释器。

## 在已有项目中使用PDM

1. **进入项目目录**：
   - 在终端中进入已有项目的根目录。

2. **初始化PDM**：
   - 运行以下命令来初始化PDM：
     ```bash
     pdm init
     ```
   - PDM会生成一个`pyproject.toml`文件，并询问一些关于项目的基本信息。

3. **安装依赖**：
   - 使用以下命令添加项目依赖：
     ```bash
     pdm add <package_name>
     ```
   - 你可以一次性添加多个依赖包，PDM会自动更新`pdm.lock`文件以锁定每个包的版本。

4. **同步依赖**：
   - 如果你已经有一个`pdm.lock`文件，可以使用以下命令同步依赖：
     ```bash
     pdm sync
     ```

5. **管理项目配置**：
   - 查看当前配置：
     ```bash
     pdm config
     ```
   - 修改配置：
     ```bash
     pdm config <key> <value>
     ```

通过以上步骤，你可以轻松地使用PDM创建新项目或在已有项目中管理依赖和配置。更多详细信息可以参考PDM的官方文档：[PDM文档](https://pdm-project.org/latest/usage/project/)[1][2][3][4][6]。
