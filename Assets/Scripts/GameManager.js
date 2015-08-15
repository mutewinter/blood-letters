#pragma strict

public var enemyPrefabs : GameObject[];
public var playerPrefab : GameObject;
public var wall : GameObject;

// Custom Mouse Cursor
public var cursorTexture: Texture2D;
public var hotSpot: Vector2 = Vector2.zero;

private var mouse = Vector2.zero;
private var currentStage = 1;
private var spawnedEnemies = new List.<GameObject>();
private var player: GameObject;

function Start() {
  spawnWalls();
  player = spawnPlayer();
  setupStage(currentStage);

  // We draw our own cursor below
  Cursor.visible = false;
}

function setupStage(stage: int) {
  var enemyCount = Mathf.CeilToInt(Mathf.Log(stage, 2)) || 1;

  for (var i = 0; i < enemyCount; i++) {
    spawnedEnemies.Add(spawnRandomEnemy());
  }

  var canvas = GameObject.FindWithTag('HUD');
  var statusManager = canvas.GetComponentInChildren(StatusManager);
  statusManager.showStageTitle(currentStage);
}

function Update() {
  mouse = new Vector2(
    Input.mousePosition.x, Screen.height - Input.mousePosition.y
  );
}

function OnGUI() {
  var w = cursorTexture.width;
  var h = cursorTexture.height;

  GUI.DrawTexture(
    new Rect(mouse.x - hotSpot.x, mouse.y - hotSpot.y, w, h), cursorTexture
  );
}

function spawnRandomEnemy() : GameObject {
  var enemyPrefab = enemyPrefabs[Random.Range(0, enemyPrefabs.Length)];

  var position = new Vector3(
    Random.Range(-2.0F, 2.0F),
    Random.Range(-2.0F, 2.0F),
    0
  );

  return Instantiate(enemyPrefab, position, Quaternion.identity);
}

function spawnPlayer() {
  return Instantiate(playerPrefab, Vector3.zero, Quaternion.identity);
}

function characterDied(character: Character) {
  if (character.transform.tag == 'enemy') {
    spawnedEnemies.Remove(character.gameObject);
  } else if (character instanceof Player) {
    player = null;
  }
  handleWinLoss();
}

function handleWinLoss() {
  if (!player) {
    for (var enemy in spawnedEnemies) {
      Destroy(enemy);
    }
    player = spawnPlayer();
    currentStage = 1;
    setupStage(currentStage);
  } else if (spawnedEnemies.Count == 0) {
    setupStage(currentStage++);
  }
}

function spawnWalls() {
  // Right
  Instantiate(wall, Vector2(2.5, 0), Quaternion.identity);
  // Left
  Instantiate(wall, Vector2(-2.5, 0), Quaternion.identity);

  var horizontalRotation = Quaternion.identity;
  horizontalRotation.eulerAngles = Vector3(0, 0, 90);

  // Bottom
  Instantiate(wall, Vector2(0, 2.5), horizontalRotation);
  // Top
  Instantiate(wall, Vector2(0, -2.5), horizontalRotation);
}
