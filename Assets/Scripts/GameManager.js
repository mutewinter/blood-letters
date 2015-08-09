#pragma strict

public var enemyPrefabs : GameObject[];
public var player : GameObject;
public var wall : GameObject;

// Custom Mouse Cursor
public var cursorTexture: Texture2D;
public var hotSpot: Vector2 = Vector2.zero;
private var mouse = Vector2.zero;

function Start () {
  spawnWalls();

  spawnPlayer();

  for (var i = 0; i < 8; i++) {
    spawnRandomEnemy();
  }

  // We draw our own cursor below
  Cursor.visible = false;
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

function spawnRandomEnemy() {
  var enemyPrefab = enemyPrefabs[0];

  var position = new Vector3(
    Random.Range(-2.0F, 2.0F),
    Random.Range(-2.0F, 2.0F),
    0
  );
  Instantiate(enemyPrefab, position, Quaternion.identity);
}

function spawnPlayer() {
  Instantiate(player, Vector3.zero, Quaternion.identity);
}

function characterDied(character: Character) {
  if (character instanceof Player) {
    spawnPlayer();
  } else {
    // TODO ensure this is an enemy prefab
    spawnRandomEnemy();
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
