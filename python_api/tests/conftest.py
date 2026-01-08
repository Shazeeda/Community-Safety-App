import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))

PYTHON_API_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PYTHON_API_ROOT))
