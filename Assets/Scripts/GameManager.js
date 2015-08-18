﻿#pragma strict

import System.Collections.Generic;

public var playerPrefab : GameObject;
public var roomPrefab: GameObject;

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
  if (!player) {
    player = spawnPlayer();
  }
  statusManager.showTitle(String.Format('Stage {0}', stage));

  var enemyCount = Mathf.CeilToInt(Mathf.Log(stage, 2)) || 1;
  var roomSize = 2.5;

  makeRoom(Vector2.zero, roomSize, Vector2.right, enemyCount);
  makeRoom(Vector2(5, 0), roomSize, Vector2.left, enemyCount);
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

    clearEnemies();
    clearSkillDrops();
    currentStage = 1;
    setupStage(currentStage);
  } else if (spawnedEnemyCount() == 0) {
    // Player lived, next stage.
    setupStage(++currentStage);
  }
}

function clearEnemies() {
  for (var room in rooms) {
    Destroy(room);
  }
}

function clearSkillDrops() {
  var skillDrops = GameObject.FindGameObjectsWithTag('SkillDrop');
  for (var skillDrop in skillDrops) {
    Destroy(skillDrop.gameObject);
  }
}

function makeRoom(
  position: Vector2,
  size: float,
  doorPosition: Vector2,
  enemyCount: int
) {
  var roomObject = Instantiate(roomPrefab, position, Quaternion.identity);
  var room = roomObject.GetComponent(Room);
  room.doorPosition = doorPosition;
  room.enemyCount = enemyCount;
  room.size = size;
  rooms.Add(room);
}

function spawnedEnemyCount() : int {
  var count = 0;
  for (var room in rooms) {
    count += room.spawnedEnemyCount();
  }
  return count;
}
