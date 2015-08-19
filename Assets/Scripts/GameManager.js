#pragma strict

import System.Collections.Generic;

public var playerPrefab : GameObject;
public var squareRoomPrefab: GameObject;
public var enemyPrefabs : GameObject[];

// Custom Mouse Cursor
public var cursorTexture: Texture2D;
public var hotSpot: Vector2 = Vector2.zero;

private var mouse = Vector2.zero;
private var currentStage = 1;
private var player: GameObject;
private var statusManager: StatusManager;
private var rooms = new List.<Room>();

function Start() {
  var canvas = GameObject.FindWithTag('HUD');
  statusManager = canvas.GetComponentInChildren(StatusManager);

  setupStage(currentStage);

  // We draw our own cursor below
  Cursor.visible = false;
}

function setupStage(stage: int) {
  statusManager.showTitle(String.Format('Stage {0}', stage));

  resetStage();
  if (!player) {
    player = spawnPlayer();
  }

  player.transform.position = Vector2.zero;
  centerCameraOnPlayer();

  var enemyCount = Mathf.CeilToInt(Mathf.Log(stage, 2)) || 1;
  var enemyPrefabsToSpawn = enemyPrefabs;

  if (stage == 1) {
    enemyPrefabsToSpawn = [enemyPrefabsToSpawn[0]];
  }

  var directions = [
    Vector2.up,
    Vector2.right,
    Vector2.down,
    Vector2.left
  ];
  var doorDirection = directions[Random.Range(0, directions.length)];

  makeSquareRoom(Vector2.zero, doorDirection, enemyPrefabsToSpawn, enemyCount);

  var secondRoomPosition = doorDirection * 5;

  makeSquareRoomWithoutWall(
    secondRoomPosition, -doorDirection, enemyPrefabsToSpawn, enemyCount
  );
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

function spawnPlayer() {
  return Instantiate(playerPrefab, Vector3.zero, Quaternion.identity);
}

function characterDied(character: Character) {
  if (character.transform.tag == 'enemy') {
    for (var room in rooms) {
      room.removeEnemy(character.gameObject);
    }
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

    currentStage = 1;
    setupStage(currentStage);
  } else if (spawnedEnemyCount() == 0) {
    // Player lived, next stage.
    statusManager.showTitle('Stage Clear', Color.green);
    yield WaitForSeconds(2.5);
    setupStage(++currentStage);
  }
}

function resetStage() {
  clearSkillDrops();
  for (var room in rooms) {
    Destroy(room.gameObject);
  }
  rooms.Clear();
}

function clearSkillDrops() {
  var skillDrops = GameObject.FindGameObjectsWithTag('SkillDrop');
  for (var skillDrop in skillDrops) {
    Destroy(skillDrop.gameObject);
  }
}

function makeSquareRoom(
  position: Vector2,
  doorPosition: Vector2,
  enemyPrefabsToSpawn: GameObject[],
  enemyCount: int
) {
  var roomObject = Instantiate(squareRoomPrefab, position, Quaternion.identity);
  var room = roomObject.GetComponent(SquareRoom);
  room.spawnEnemies(enemyCount, enemyPrefabsToSpawn);
  room.addDoor(doorPosition);
  rooms.Add(room);
}

function makeSquareRoomWithoutWall(
  position: Vector2,
  emptyWallPosition: Vector2,
  enemyPrefabsToSpawn: GameObject[],
  enemyCount: int
) {
  var roomObject = Instantiate(squareRoomPrefab, position, Quaternion.identity);
  var room = roomObject.GetComponent(SquareRoom);
  room.spawnEnemies(enemyCount, enemyPrefabsToSpawn);
  room.removeWall(emptyWallPosition);
  rooms.Add(room);
}

function spawnedEnemyCount() : int {
  var count = 0;
  for (var room in rooms) {
    count += room.spawnedEnemyCount();
  }
  return count;
}

// TODO DRY with PlayerInputResponder
function centerCameraOnPlayer() {
  var mainCamera = GameObject.FindWithTag('MainCamera');
  mainCamera.transform.position = Vector3(
    player.transform.position.x,
    player.transform.position.y,
    mainCamera.transform.position.z
  );
}
