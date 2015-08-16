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
private var statusManager: StatusManager;

function Start() {
  var canvas = GameObject.FindWithTag('HUD');
  statusManager = canvas.GetComponentInChildren(StatusManager);

  spawnWalls();
  setupStage(currentStage);

  // We draw our own cursor below
  Cursor.visible = false;
}

function setupStage(stage: int) {
  if (!player) {
    player = spawnPlayer();
  }
  statusManager.showTitle(String.Format('Stage {0}', stage));

  // wait for the end of the level text to spawn enemies
  // TODO Depend on level animation end, not timer
  yield WaitForSeconds(1);

  var enemyCount = Mathf.CeilToInt(Mathf.Log(stage, 2)) || 1;

  for (var i = 0; i < enemyCount; i++) {
    spawnedEnemies.Add(spawnRandomEnemy());
  }
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
    // Player died, lost stage.
    statusManager.showTitle('Game Over', Color.red);
    yield WaitForSeconds(2);

    clearEnemies();
    clearSkillDrops();
    currentStage = 1;
    setupStage(currentStage);
  } else if (spawnedEnemies.Count == 0) {
    // Player lived, next stage.
    setupStage(currentStage++);
  }
}

function clearEnemies() {
  for (var enemy in spawnedEnemies) {
    Destroy(enemy);
  }
  spawnedEnemies.Clear();
}

function clearSkillDrops() {
  var skillDrops = GameObject.FindGameObjectsWithTag('SkillDrop');
  for (var skillDrop in skillDrops) {
    Destroy(skillDrop.gameObject);
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
