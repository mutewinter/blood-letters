#pragma strict

public var enemyPrefabs : GameObject[];
public var player : GameObject;

// Custom Mouse Cursor
public var cursorTexture: Texture2D;
public var hotSpot: Vector2 = Vector2.zero;
private var mouse = Vector2.zero;

function Start () {
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
  var enemyPrefab = enemyPrefabs[Random.Range(0, enemyPrefabs.Length)];

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
